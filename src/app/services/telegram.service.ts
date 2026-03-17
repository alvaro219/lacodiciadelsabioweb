import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private readonly botToken = environment.telegramBotToken;
  private readonly chatId = environment.telegramChatId;
  private readonly apiUrl = `https://api.telegram.org/bot${environment.telegramBotToken}/sendMessage`;

  async sendSignupNotification(name: string, email: string, eventTitle: string): Promise<void> {
    if (!this.botToken || this.botToken === 'TU_BOT_TOKEN_AQUI') {
      console.warn('Telegram bot token no configurado.');
      return;
    }

    const message =
      `📋 *Nueva inscripción a evento*\n\n` +
      `👤 *Nombre:* ${this.escapeMarkdown(name)}\n` +
      `📧 *Email:* ${this.escapeMarkdown(email)}\n` +
      `🎮 *Evento:* ${this.escapeMarkdown(eventTitle)}`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        console.error('Error enviando notificación a Telegram:', await response.text());
      }
    } catch (error) {
      console.error('Error enviando notificación a Telegram:', error);
    }
  }

  private escapeMarkdown(text: string): string {
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
  }
}
