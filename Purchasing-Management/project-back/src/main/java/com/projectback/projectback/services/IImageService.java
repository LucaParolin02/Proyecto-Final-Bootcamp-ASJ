package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.ImageModel;

public interface IImageService {

	List<ImageModel> getImagesByProduct(Integer id);
	List<ImageModel> getImages();
	ImageModel getImageById(Integer id);
	ImageModel addImage(ImageModel image);
	ImageModel deleteImage(Integer id);
	ImageModel editImage(Integer id, ImageModel image);
	
}
