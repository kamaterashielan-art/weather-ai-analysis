import os
import sys
from pathlib import Path

# Project root
PROJECT_ROOT = Path(__file__).parent.parent

# Model paths
MODEL_PATH = os.getenv('MODEL_PATH', str(PROJECT_ROOT / 'models' / 'mimo_model.h5'))
DATA_PATH = os.getenv('DATA_PATH', str(PROJECT_ROOT / 'data'))

# Training config
BATCH_SIZE = int(os.getenv('BATCH_SIZE', 32))
EPOCHS = int(os.getenv('EPOCHS', 100))
VALIDATION_SPLIT = 0.2
TEST_SPLIT = 0.1

# Model config
INPUT_FEATURES = [
    'temperature',
    'humidity',
    'pressure',
    'wind_speed',
    'wind_direction',
    'cloud_cover',
    'visibility',
    'precipitation'
]

OUTPUT_FEATURES = [
    'temperature',
    'humidity',
    'precipitation',
    'wind_speed'
]

# Preprocessing
FEATURE_SCALING = 'standard'  # 'standard' or 'minmax'
HANDLE_MISSING = 'mean'  # 'mean', 'median', 'forward_fill'
OUTLIER_METHOD = 'iqr'  # 'iqr' or 'zscore'

# API config
API_HOST = os.getenv('API_HOST', '0.0.0.0')
API_PORT = int(os.getenv('API_PORT', 8000))

# Logging
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = str(PROJECT_ROOT / 'logs' / 'ml_service.log')
