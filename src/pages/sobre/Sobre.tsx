import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Sobre: React.FC = () => {

  const handleGitClickProfile = () => {
    window.open('https://github.com/Marcuusvp', '_blank');
  };

  const handleLinkedIn = () => {
    window.open('https://www.linkedin.com/in/marcus-vinicius-pereira-045613239/', '_blank');
  };

  const handleGitClick = () => {
    window.open('https://github.com/Marcuusvp/ApiLoginUsuario', '_blank');
  };

  const handleGitClickFront = () => {
    window.open('https://github.com/Marcuusvp/WebSistema', '_blank');
  };

  return(
    <LayoutBaseDePagina titulo='Sobre o projeto' barraDeFerramentas ={(
      <FerramentasDeDetalhe 
        mostrarBotaoSalvar={false}
        mostrarBotaoApagar={false}
        mostrarBotaoSalvarEFechar={false}
        mostrarBotaoVoltar={false}
        mostrarBotaoNovo={false}
        mostrarBotaoGitFront
        textoBotaoGitFront='Front-End'
        aoClicarEmGitFront={handleGitClickFront}
        mostrarBotaoGit
        textoBotaoGit='Back-End'
        aoClicarEmGit={handleGitClick}/>
    )}>
      <Box p={4}>
        <Card>
          <Box p={4}>
            <Typography variant="h4" gutterBottom>
    Bem-vindo ao sistema CRUD de clientes e cidades!
            </Typography>
            <Typography variant="body1" gutterBottom>
    Nos botões acima estão os repositórios dos projetos, 
    o back-end é o repositório da API que faz o tratamento dos dados e comunicação com o banco de dados e o front-end é a parte onde estamos, 
    o que fica visível ao usuário.
              <ul>
                <li>
                  <Typography variant="body1" display="inline"><strong>Aba Cidades</strong> - </Typography>
                  <Typography variant="body1" display="inline">Adiciona/Deleta ou Edita uma cidade(Se algum cliente apontar para essa cidade, ela ainda não pode ser deletada).</Typography>                    
                </li>
                <li>
                  <Typography variant="body1" display="inline"><strong>Aba Clientes</strong> - </Typography>
                  <Typography variant="body1" display="inline">Adiciona/Deleta ou Edita um cliente.</Typography> 
                </li>
                <li>
                  <Typography variant="body1" display="inline"><strong>Aba Menu Principal</strong> - </Typography>
                  <Typography variant="body1" display="inline">Exibe cards com o numero total de clientes/cidades cadastradas no banco.</Typography> 
                </li>
              </ul>
            </Typography>
            <Typography variant="body1" gutterBottom>
                Nos cards abaixo apresento mais detalhes sobre o sistema, o texto pode ou não ter sido gerado com ajuda de uma IA.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Disponibilizo também meu perfil no GitHub e Linkedin para contato!
            </Typography>
            <Box gap={1}              
              display='flex'>
              <Button variant='contained' color='inherit' startIcon={<Icon>terminal</Icon>} onClick={handleGitClickProfile}>
                Github
              </Button>
              <Button variant='contained' color='info' startIcon={<Icon>alternate_email</Icon>} onClick={handleLinkedIn}>
                Linkedin
              </Button>
            </Box>
          </Box>
        </Card>
        <Box mt={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
    Front-end do Projeto
                  </Typography>
                  <Typography variant="body1" gutterBottom>
    O front-end do projeto foi desenvolvido utilizando as seguintes tecnologias e abordagens:
                  </Typography>
                  <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem' }}>
                    <li>
                      <Typography variant="body1" display="inline"><strong>React</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma biblioteca JavaScript para a construção de interfaces de usuário em aplicações web.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>TypeScript</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma extensão tipada do JavaScript que adiciona tipos estáticos ao código.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Material-UI</strong> - </Typography>
                      <Typography variant="body1" display="inline">Um popular framework de design de componentes React que segue as diretrizes do Material Design do Google.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Context API</strong> - </Typography>
                      <Typography variant="body1" display="inline">Abordagem nativa do React para gerenciar o estado global, usada no projeto para gerenciar autenticação e temas claro e escuro.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>React Router</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma biblioteca de roteamento para React que permite criar rotas e navegação entre páginas do aplicativo.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Hooks</strong> - </Typography>
                      <Typography variant="body1" display="inline">Funções nativas do React que permitem gerenciar o estado e o ciclo de vida dos componentes funcionais.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Axios</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma biblioteca popular para realizar solicitações HTTP em aplicações JavaScript, usada para fazer chamadas à API do back-end.</Typography>
                    </li>
                  </ul>
                  <Typography variant="body1">
    O projeto front-end segue uma estrutura modular e escalável, com componentes organizados em pastas específicas e estilos aplicados de maneira consistente. Além disso, a aplicação é responsiva, garantindo uma boa experiência de usuário em diferentes dispositivos e tamanhos de tela.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
  Back-end do Projeto
                  </Typography>
                  <Typography variant="body1" gutterBottom>
  O back-end do projeto foi desenvolvido utilizando as seguintes tecnologias e abordagens:
                  </Typography>
                  <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem' }}>
                    <li>
                      <Typography variant="body1" display="inline"><strong>C#</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma linguagem de programação moderna, versátil e de alto desempenho, utilizada na implementação da lógica de negócios e do servidor.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>ASP.NET Core</strong> - </Typography>
                      <Typography variant="body1" display="inline">Um framework de desenvolvimento web da Microsoft, baseado em C#, que permite a criação de aplicações web escaláveis e com alto desempenho.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>PostgreSQL</strong> - </Typography>
                      <Typography variant="body1" display="inline">Um sistema de gerenciamento de banco de dados relacional open-source, conhecido por sua robustez, escalabilidade e desempenho.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Dapper</strong> - </Typography>
                      <Typography variant="body1" display="inline">Um micro ORM (Object-Relational Mapping) para .NET que simplifica a comunicação entre a aplicação e o banco de dados, otimizando as consultas e garantindo um bom desempenho.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Swagger</strong> - </Typography>
                      <Typography variant="body1" display="inline">Uma ferramenta para documentação e teste de APIs, que facilita o entendimento e o uso da API desenvolvida no back-end do projeto.</Typography>
                    </li>
                    <li>
                      <Typography variant="body1" display="inline"><strong>Autenticação e Autorização</strong> - </Typography>
                      <Typography variant="body1" display="inline">O projeto utiliza técnicas modernas de autenticação e autorização para garantir a segurança e o acesso apropriado aos recursos da API.</Typography>
                    </li>
                  </ul>
                  <Typography variant="body1">
  O projeto back-end segue as melhores práticas de desenvolvimento, como a separação de responsabilidades, injeção de dependências e a organização do código em camadas. A API desenvolvida permite realizar operações CRUD (criação, leitura, atualização e exclusão) de clientes e cidades, com um relacionamento onde um cliente pertence a uma cidade, enquanto uma cidade pode ter zero ou mais clientes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
};