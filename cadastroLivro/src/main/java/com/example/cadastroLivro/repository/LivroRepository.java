package com.example.cadastroLivro.repository;


import com.example.cadastroLivro.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LivroRepository extends JpaRepository<Livro, Long> {
}
