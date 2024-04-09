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
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>
  
      {/* Formulário de adição de livro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="Isbn"
          value={novoLivro.livro}
          onChange={handleInputChange}
        />
        {/* Campo para a título */}
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="Editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
        {/* Campo para o autor */}
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
        {/* Campo para o gênero */}
        <input
          type="text"
          name="genero"
          placeholder="Gênero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de livros */}
      <ul>
        {/* Mapeamento dos livros */}
        {livros.map((livro) => (
          <li key={livro.id}>
            {/* Exibição dos detalhes do veículo */}
            {livro.isbn} - {livro.titulo} - {livro.editora} - ({livro.autor}) - {livro.genero}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button
              onClick={() =>
                handleUpdate(livro.id, {
                  ...livro,
                  isbn: novoLivro.isbn,
                  titulo: novoLivro.titulo,
                  editora: novoLivro.editora,
                  autor: novoLivro.autor,
                  genero: novoLivro.genero,
          
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
