from abc import ABC, abstractmethod

class ImageAccessorInterface(ABC):
    @abstractmethod
    def get_image(self, query: str, max_images) -> set[str]:
        pass