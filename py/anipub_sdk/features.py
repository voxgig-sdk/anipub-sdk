# Anipub SDK feature factory

from anipub_sdk.feature.base_feature import AnipubBaseFeature
from anipub_sdk.feature.ratelimit_feature import AnipubRatelimitFeature
from anipub_sdk.feature.retry_feature import AnipubRetryFeature
from anipub_sdk.feature.test_feature import AnipubTestFeature
from anipub_sdk.feature.timeout_feature import AnipubTimeoutFeature


_FEATURES = {
    "base": lambda: AnipubBaseFeature(),
    "ratelimit": lambda: AnipubRatelimitFeature(),
    "retry": lambda: AnipubRetryFeature(),
    "test": lambda: AnipubTestFeature(),
    "timeout": lambda: AnipubTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
