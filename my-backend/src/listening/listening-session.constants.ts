export const PLAYBACK_SPEEDS = [0.75, 1] as const;
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

export const PLAYBACK_MODES = ['study', 'continuous'] as const;
export type PlaybackMode = (typeof PLAYBACK_MODES)[number];

export const AMBIENT_SOUNDS = ['cafe', 'road', 'market', 'office'] as const;
export type AmbientSound = (typeof AMBIENT_SOUNDS)[number];

export const DEFAULT_PLAYBACK_SPEED: PlaybackSpeed = 1;
export const DEFAULT_PLAYBACK_MODE: PlaybackMode = 'study';
export const DEFAULT_AMBIENT_SOUND: AmbientSound | null = null;
export const DEFAULT_AMBIENT_VOLUME = 40;

export function normalizePlaybackSpeed(
  value: unknown,
): PlaybackSpeed | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const normalized =
    typeof value === 'string'
      ? Number(value.toLowerCase().replace('x', '').trim())
      : Number(value);

  return normalized as PlaybackSpeed;
}

export function normalizePlaybackMode(
  value: unknown,
): PlaybackMode | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const normalized = String(value).trim().toLowerCase();

  if (
    normalized === 'study' ||
    normalized === 'auto_stop' ||
    normalized === 'auto-stop' ||
    normalized === 'autostop'
  ) {
    return 'study';
  }

  return normalized as PlaybackMode;
}

export function normalizeAmbientSound(
  value: unknown,
): AmbientSound | null | undefined {
  if (value === undefined || value === '') {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();

  if (normalized === 'off' || normalized === 'none') {
    return null;
  }

  if (normalized === 'street') {
    return 'road';
  }

  return normalized as AmbientSound;
}

export function normalizeAmbientVolume(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return Number(value);
}
