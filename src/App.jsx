import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    isbn: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: '',
  });

  useEffect(() => {
    fetchLivros();
  }, []);

  //GET
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };
  
  //ATUALIZAÇÃO DOS INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };
  
  //POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      setNovoLivro({
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };
  
  const handleUpdate = async (id, livroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
      fetchLivros();
      setNovoLivro({
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  return (
    <div>
     
      <h1>Gerenciamento de Livros</h1>
  
     
      <form onSubmit={handleSubmit}>
       
        <input
          type="text"
          name="isbn"
          placeholder="Isbn"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        />
       
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
       
        <input
          type="text"
          name="editora"
          placeholder="Editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
       
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
       
        <input
          type="text"
          name="genero"
          placeholder="Gênero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
       
        <button type="submit">Adicionar Livro</button>
      </form>
  
     
      <ul>
       
        {livros.map((livro) => (
          <li key={livro.id}>
           
            {livro.isbn} - {livro.titulo} - {livro.editora} - ({livro.autor}) - {livro.genero}
            
           
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
            
           
            <button
              onClick={() =>
                handleUpdate(livro.id, {
                  ...livro,
                  isbn: novoLivro.isbn !== "" ? novoLivro.isbn : livro.isbn,
                  titulo: novoLivro.titulo !== "" ? novoLivro.titulo : livro.titulo,
                  editora: novoLivro.editora !== "" ? novoLivro.editora : livro.editora,
                  autor: novoLivro.autor !== "" ? novoLivro.autor : livro.autor,
                  genero: novoLivro.genero !== "" ? novoLivro.genero : livro.genero,
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App
