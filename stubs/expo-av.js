// Stub for expo-av - provides enough surface for Taro runtime's getRecorderManager
// to not crash when Taro's internal code references Audio.RECORDING_OPTION_* constants.
const Audio = {
  // Recording options for Android
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4: 'mpeg_4',
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_2: 'mpeg_2',
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_NB: 'amr_nb',
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB: 'amr_wb',
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AAC_ADTS: 'aac_adts',
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT: 'default',
  // Recording options for Android audio encoder
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC: 'aac',
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB: 'amr_nb',
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB: 'amr_wb',
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT: 'default',
  // Recording options for iOS
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN: 0,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW: 1,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM: 2,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH: 3,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX: 4,
  // Enums (legacy names)
  AndroidOutputFormat: { MPEG_4: 'mpeg_4', MPEG_2: 'mpeg_2', AMR_NB: 'amr_nb', AMR_WB: 'amr_wb', AAC_ADTS: 'aac_adts', DEFAULT: 'default' },
  AndroidAudioEncoder: { AAC: 'aac', AMR_NB: 'amr_nb', AMR_WB: 'amr_wb', DEFAULT: 'default' },
  IOSAudioQuality: { MIN: 0, LOW: 1, MEDIUM: 2, HIGH: 3, MAX: 4 },
  // No-op stubs for methods Taro might call at module init
  Sound: class Sound {
    loadAsync() { return Promise.resolve({}); }
    unloadAsync() { return Promise.resolve(); }
    playAsync() { return Promise.resolve(); }
    pauseAsync() { return Promise.resolve(); }
    stopAsync() { return Promise.resolve(); }
    setPositionAsync() { return Promise.resolve(); }
    setVolumeAsync() { return Promise.resolve(); }
    setIsLoopingAsync() { return Promise.resolve(); }
    getStatusAsync() { return Promise.resolve({ isLoaded: false, isPlaying: false }); }
    setOnPlaybackStatusUpdate() {}
    playFromPositionAsync() { return Promise.resolve(); }
  },
  Recording: class Recording {
    prepareToRecordAsync() { return Promise.resolve(); }
    startAsync() { return Promise.resolve(); }
    stopAndUnloadAsync() { return Promise.resolve(); }
    getStatusAsync() { return Promise.resolve({ canRecord: false }); }
    setOnRecordingStatusUpdate() {}
  },
  setAudioModeAsync() { return Promise.resolve(); },
  requestPermissionsAsync() { return Promise.resolve({ granted: true }); },
  getPermissionsAsync() { return Promise.resolve({ granted: true }); },
};

module.exports = { Audio, default: { Audio } };
