# ProjectName SDK exists test

import pytest
from anipub_sdk import AnipubSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AnipubSDK.test(None, None)
        assert testsdk is not None
