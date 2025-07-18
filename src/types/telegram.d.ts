declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
            language_code?: string;
          };
        };
        ready?: () => void;
        expand?: () => void;
        close?: () => void;
      };
    };
  }
}

export {};