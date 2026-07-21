# Anipub SDK utility: make_context

from core.context import AnipubContext


def make_context_util(ctxmap, basectx):
    return AnipubContext(ctxmap, basectx)
