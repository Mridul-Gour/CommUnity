package com.example.controller;

import com.example.model.Post;
import com.example.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173") 
public class PostController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestParam("description") String description, 
                           @RequestParam("image") MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            throw new RuntimeException("Image file is required");
        }

        // Save the file locally
        byte[] bytes = image.getBytes();
        Path path = Paths.get(UPLOAD_DIR + image.getOriginalFilename());
        Files.write(path, bytes);

        String imageUrl = "http://localhost:8080/uploads/" + image.getOriginalFilename();

        Post post = new Post(description, imageUrl);
        return postRepository.save(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) {
        postRepository.deleteById(id);
    }
}
