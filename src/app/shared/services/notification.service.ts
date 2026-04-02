import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly notifications = signal<AppNotification[]>([]);
  
  // A subtle bubble pop sound in base64 to avoid missing asset issues
  // This is a minimal valid 100ms sine pop in mp3/wav format.
  private readonly POP_SOUND_B64 = "data:audio/wav;base64,UklGRqAFAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQFAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf3p2cW5qZ2RhXlxZWFVUU1JRUVBPTk1MTExLTE1PUFNWWFtcX2NnaWxxdHl+goaKjI+RlJebnKGkp6msrrCztLe6vL/Cw8TFxsfHyMnJycjHx8bGxsXFw8O/vru5uLe1tbSzsbCvq6mopqSjoaCenZubmZqYlpaWlZWUlZOTkZCQjo6KioeGhoSDgoKBgH9+fXx7enp5eHh4d3V1c3JxbnBva2tnZmRhYF5dW1pZV1RTUlBQTk1MS0pKSklHRkRDQkFAQD8+PDs6OTg3NjU0MzIxMC8uLSwrKiknJSUjIiEgHh0cGxoZFxYVExIQDw4NDAsKCQgIBgUEAwIBAQAA//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29ra2djY19bV1NPT0tHR0NDPzs3MzMvKysrJyMjIx8bGxsXExMTDwsLCwMDAv7++vr69u7u6urm5t7W1tLKysbCwr66trKurqqmop6elpKOioaCenp2bm5qYmJeWlpWUlJOTkZCQjo+NjIqKiIeGhYSDg4KBgIB/fn18e3p5eHh3dnZ1dHRzcnJxcG9ubm1sbGtraploWVk=";
  
  private audioContext: HTMLAudioElement | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      try {
        this.audioContext = new Audio();
        this.audioContext.src = this.POP_SOUND_B64;
      } catch (e) {
        console.warn('Audio context creation failed.', e);
      }
    }
  }

  show(notification: Omit<AppNotification, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification: AppNotification = { ...notification, id };
    
    // Play sound and add to state
    this.playSound(notification.type);
    
    this.notifications.update(current => [...current, newNotification]);

    // Auto remove
    const duration = notification.duration || 4000;
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(title: string, message: string = '', duration?: number) {
    this.show({ type: 'success', title, message, duration });
  }

  error(title: string, message: string = '', duration?: number) {
    this.show({ type: 'error', title, message, duration });
  }

  warning(title: string, message: string = '', duration?: number) {
    this.show({ type: 'warning', title, message, duration });
  }

  info(title: string, message: string = '', duration?: number) {
    this.show({ type: 'info', title, message, duration });
  }

  remove(id: string) {
    this.notifications.update(current => current.filter(n => n.id !== id));
  }

  private playSound(type: NotificationType) {
    if (this.isBrowser && this.audioContext) {
      // Small variation based on type could be added, but keeping it simple for now
      try {
        // Reset playback position if it was already playing rapidly
        this.audioContext.currentTime = 0; 
        
        // Lower volume a bit so it's not jarring
        this.audioContext.volume = type === 'error' ? 0.8 : 0.4;
        
        // Use a promise to catch browsers blocking autoplay
        const playPromise = this.audioContext.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Autoplay blocked, no big deal for the notification display
          });
        }
      } catch (e) {}
    }
  }
}
