package com.example.controller;

import com.example.model.Notice;
import com.example.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Notice> getNoticeById(@PathVariable String id) {
        return noticeRepository.findById(id);
    }

    @PostMapping
    public Notice addNotice(@RequestBody Notice notice) {
        return noticeRepository.save(notice);
    }

    @PutMapping("/{id}")
    public Notice updateNotice(@PathVariable String id, @RequestBody Notice updatedNotice) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setTitle(updatedNotice.getTitle());
            notice.setDescription(updatedNotice.getDescription());
            notice.setDate(updatedNotice.getDate());
            return noticeRepository.save(notice);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable String id) {
        noticeRepository.deleteById(id);
        return "Notice deleted successfully!";
    }
}
