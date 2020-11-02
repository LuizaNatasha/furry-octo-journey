-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Nov-2020 às 21:22
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cav`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `anuncios`
--

CREATE TABLE `anuncios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `foto_u_r_l` varchar(255) DEFAULT 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg',
  `tipo_imovel` enum('Apartamento','Kitnet','Casa','Chácara','Flat') NOT NULL,
  `tipo_anuncio` varchar(255) NOT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado_u_f` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `quartos` int(11) DEFAULT 1,
  `banheiros` int(11) DEFAULT 1,
  `vagas` int(11) DEFAULT 1,
  `arem2` float NOT NULL,
  `descricao` text DEFAULT NULL,
  `valor` float NOT NULL,
  `iptu` float DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `anuncios`
--

INSERT INTO `anuncios` (`id`, `id_usuario`, `foto_u_r_l`, `tipo_imovel`, `tipo_anuncio`, `cep`, `cidade`, `estado_u_f`, `bairro`, `endereco`, `numero`, `complemento`, `quartos`, `banheiros`, `vagas`, `arem2`, `descricao`, `valor`, `iptu`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg', 'Casa', 'Vendo', '69087-380', 'Manaus', 'AM', 'Tracredo Neves', 'Próximo a escola Jorge de Rezende', 33, 'Proximo ao Colegio JR Sobrinho', 2, 1, 21, 12, '2wqdewf', 100, 0, '2020-11-02 19:32:08', '2020-11-02 19:32:08'),
(2, 1, 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg', 'Casa', 'Vendo', '69087-380', 'Manaus', 'AM', 'Jorge Teixeira', 'Próximo a escola Jorge de Rezende', 31, 'Proximo ao Veterinário Vida', 1, 1, 1, 1, '1', 1200, 0, '2020-11-02 19:48:57', '2020-11-02 19:48:57'),
(3, 1, 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg', 'Chácara', 'Alugo', '69087-380', 'Manaus', 'AM', 'Ponta Negra', 'Próximo a escola Jorge de Rezende', 43, 'Doutor SJue', 1, 1, 1, 1, '1111', 1210, 0, '2020-11-02 19:59:38', '2020-11-02 19:59:38');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) DEFAULT 'NÃO INSERIDO',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `senha`, `telefone`, `created_at`, `updated_at`) VALUES
(1, 'teste15242', 'teste15242@gmail.com', 'teste15242', 'teste15242', '2020-11-02 19:28:43', '2020-11-02 19:28:43');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `anuncios`
--
ALTER TABLE `anuncios`
  ADD CONSTRAINT `anuncios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
