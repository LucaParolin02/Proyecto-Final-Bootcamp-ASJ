package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.exceptions.DuplicateEntityException;
import com.projectback.projectback.models.ImageModel;
import com.projectback.projectback.repositories.ImageRepository;
import com.projectback.projectback.services.IImageService;
import com.projectback.projectback.services.IProductService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ImageService implements IImageService{

	@Autowired
	ImageRepository imageRepository;
	@Autowired
	IProductService iProductService;
	
	@Override
	public List<ImageModel> getImagesByProduct(Integer id){
		return imageRepository.findByProduct_IdAndDeletedFalse(id);
	}
	
	@Override
	public ImageModel getImageById(Integer id) {
		Optional<ImageModel> image = imageRepository.findById(id);
		if (image.isPresent()) {
			return image.get();
		}
		throw new EntityNotFoundException("Image with ID " + id + " not found");
	}
	
	@Override
	public ImageModel addImage(ImageModel image) {
		validateCategoryNameUniquess(image.getUrl());
		Integer productId = image.getProduct().getId();
		iProductService.getProductById(productId);
		image.setCreated(Timestamp.from(Instant.now()));
		image.setUpdated(Timestamp.from(Instant.now()));
		return imageRepository.save(image);
	}
	
	private void validateCategoryNameUniquess(String url) {
		Optional<ImageModel> existingImg = imageRepository.findByUrlAndDeletedFalse(url);
		if (existingImg.isPresent()) {
			throw new DuplicateEntityException("Image with url '" + url + "' already exists.");
		}		
	}
	
	@Override
	public ImageModel deleteImage(Integer id) {
		ImageModel imageToDelete = getImageById(id);
		imageToDelete.setDeleted(true);
		return imageRepository.save(imageToDelete);
	}
	
	@Override
	public ImageModel editImage(Integer id, ImageModel image) {
		ImageModel existingImage = getImageById(id);
		if (image.getUrl() != null) {
			existingImage.setUrl(image.getUrl());
		}
		image.setUpdated(Timestamp.from(Instant.now()));
		return imageRepository.save(existingImage);
	}
}
