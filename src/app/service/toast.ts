import { Injectable, signal, computed } from '@angular/core';
import { ToastInfo } from './model/toast.info';

@Injectable({
  providedIn: 'root'
})
export class Toast {

  private toasts$ = signal<ToastInfo[]>([]);
  toasts = computed(() => this.toasts$());

  show(body: string, type: "SUCCESS" | "DANGER") {
    let className;
    if (type === "DANGER") {
      className = 'bg-danger text-light';
    } else {
      className = 'bg-success text-light';
    }
    const toastInfo: ToastInfo = { body, className };

    this.toasts$.update(currentToasts => [...currentToasts, toastInfo]);
  }

  remove(toast: ToastInfo) {
    this.toasts$.update(currentToasts =>
      currentToasts.filter(toastToCompare => toastToCompare !== toast)
    );
  }
}
