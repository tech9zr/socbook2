package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Tag;
import rs.levi9.socbook2.service.TagService;

@RestController
@RequestMapping("/tags")
public class TagController {
private TagService tagService;
	
	@Autowired
	public TagController(TagService tagService){
		this.tagService = tagService;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.GET)
	public List<Tag> findAll(){
		return tagService.findAll();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Tag findOne(@PathVariable("id") Long id){
		return tagService.findOne(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.POST)
	public Tag save(@RequestBody Tag tag){
		return tagService.save(tag);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.PUT)
	public Tag update(@RequestBody Tag tag){
		return tagService.save(tag);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		tagService.delete(id);
	}	
}