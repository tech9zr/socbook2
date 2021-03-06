package rs.levi9.socbook2.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook2.domain.Category;
import rs.levi9.socbook2.repository.CategoryRepository;

@Service
public class CategoryService {
	
	private CategoryRepository categoryRepository;
	
	@Autowired
	public CategoryService(CategoryRepository categoryRepository){
		this.categoryRepository = categoryRepository;
	}
	
	public Category findOne(Long id){
		return categoryRepository.findOne(id);
	}
	
	public List<Category> findAll(){
		return categoryRepository.findAll();
	}
	
	public void delete(Long id){
		categoryRepository.delete(id);
	}
	
	public Category save(Category category){
		return categoryRepository.save(category);
	}
	
}