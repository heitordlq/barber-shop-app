import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private resend: Resend;

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get('RESEND_API_KEY'));
  }

  async sendBookingConfirmation(appointment: any) {
    if (!appointment.clientEmail) return;

    if (this.config.get('DEV_MODE') === 'true') {
      this.logger.log(`[DEV_MODE] Bypass: E-mail de confirmação para ${appointment.clientEmail} foi ignorado.`);
      return;
    }


    const startTime = new Date(appointment.startTime);
    const dateStr = startTime.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    });
    const timeStr = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    try {
      await this.resend.emails.send({
        from: this.config.get('EMAIL_FROM') || 'noreply@barbearia.app',
        to: appointment.clientEmail,
        subject: `✅ Agendamento Confirmado — ${appointment.tenant?.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a;">Seu agendamento foi confirmado! 💈</h1>
            <p>Olá, <strong>${appointment.clientName}</strong>!</p>
            <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p><strong>Serviço:</strong> ${appointment.service?.name}</p>
              <p><strong>Data:</strong> ${dateStr}</p>
              <p><strong>Horário:</strong> ${timeStr}</p>
              <p><strong>Barbearia:</strong> ${appointment.tenant?.name}</p>
              ${appointment.tenant?.address ? `<p><strong>Endereço:</strong> ${appointment.tenant.address}</p>` : ''}
            </div>
            <p style="color: #666; font-size: 14px;">Caso não possa comparecer, entre em contato com a barbearia.</p>
          </div>
        `,
      });
      this.logger.log(`Confirmação enviada para ${appointment.clientEmail}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar email: ${error}`);
    }
  }

  async sendNoShowNotification(appointment: any) {
    if (!appointment.clientEmail) return;

    if (this.config.get('DEV_MODE') === 'true') {
      this.logger.log(`[DEV_MODE] Bypass: E-mail de no-show para ${appointment.clientEmail} foi ignorado.`);
      return;
    }

    // Notificação de no-show (sem estorno)
    try {
      await this.resend.emails.send({
        from: this.config.get('EMAIL_FROM') || 'noreply@barbearia.app',
        to: appointment.clientEmail,
        subject: `ℹ️ Agendamento não realizado — ${appointment.tenant?.name}`,
        html: `
          <p>Olá, ${appointment.clientName}! Infelizmente não registramos sua presença no horário agendado. O valor pago não será estornado conforme nossa política.</p>
        `,
      });
    } catch (error) {
      this.logger.error(`Falha ao enviar no-show email: ${error}`);
    }
  }
}
