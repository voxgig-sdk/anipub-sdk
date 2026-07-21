# Anipub SDK feature factory

from feature.base_feature import AnipubBaseFeature
from feature.test_feature import AnipubTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AnipubBaseFeature(),
        "test": lambda: AnipubTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
