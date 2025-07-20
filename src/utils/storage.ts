import { User } from '../types/game';

const STORAGE_KEY = 'emoji_kombat_user';
const UPGRADES_KEY = 'emoji_kombat_upgrades';
const GAME_PROGRESS_KEY = 'emoji_kombat_progress';

export const saveUserData = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const loadUserData = (): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load user data:', error);
    return null;
  }
};

export const saveUpgrades = (upgrades: any[]): void => {
  try {
    localStorage.setItem(UPGRADES_KEY, JSON.stringify(upgrades));
  } catch (error) {
    console.error('Failed to save upgrades:', error);
  }
};

export const loadUpgrades = (): any[] | null => {
  try {
    const data = localStorage.getItem(UPGRADES_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load upgrades:', error);
    return null;
  }
};

export const saveGameProgress = (progress: any): void => {
  try {
    localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
};

export const loadGameProgress = (): any | null => {
  try {
    const data = localStorage.getItem(GAME_PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load game progress:', error);
    return null;
  }
};

export const clearUserData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
};