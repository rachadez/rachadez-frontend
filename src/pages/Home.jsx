import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SecondaryButton from './components/Buttons/SecondaryButton';
import Menubar from './components/Menubar/Menubar';

function Home() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div>
            <Menubar></Menubar>

            {/* Hero Section */}
            <div className="hero-section hero-gradient" id="inicio">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>
                                Organize partidas e eventos esportivos com facilidade
                            </h1>
                            <p class="descricao">
                                O Racha10 é uma plataforma desenvolvida por estudantes de Computação com o objetivo de facilitar a organização de eventos e partidas no complexo desportivo da UFCG, proporcionando uma experiência mais prática e dinâmica para todos os participantes.
                            </p>
                            <div className="hero-button-container mt-8">
                                <SecondaryButton label="Começar agora" to="/cadastro"></SecondaryButton>
                            </div>


                        </div>
                        <div className="hero-image">
                            <img src="/src/assets/imagem_equipe_tela_login.png" alt="Equipe Racha10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section" id="porque-escolher">
                <div className="features-container">
                    <div className="section-header">
                        <h2>Por que escolher o Racha10?</h2>
                        <p>
                            Nossa plataforma foi desenvolvida para atender às necessidades de estudantes, servidores e comunidade externa.
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg
                                    className="icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3>Economia de tempo</h3>
                            <p>
                                Automatize a organização de atividades e economize tempo valioso, seja para estudos, trabalho ou projetos pessoais.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg
                                    className="icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3>Colaboração facilitada</h3>
                            <p>
                                Conecte-se com colegas, forme grupos e organize suas partidas com apenas alguns cliques.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg
                                    className="icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3>Segurança e privacidade</h3>
                            <p>
                                Seus dados estão protegidos. Desenvolvido por pessoas comprometidas com a segurança e privacidade de todos os usuários.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section" id="criar-conta">
                <div className="cta-container">
                    <h2>Pronto para começar?</h2>
                    <p>
                        Junte-se as pessoas que já estão usando o Racha10 para
                        organizar suas atividades esportivas.
                    </p>
                    <div className="cta-button-container">
                        <SecondaryButton label="Criar uma conta" to="/cadastro"></SecondaryButton>
                    </div>

                </div>
            </div>

            {/* Botão Scroll to Top */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="back-to-top"
                >
                    ↑
                </button>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-logo">
                            <p className="footer-landing-page-text">Racha 10</p>
                            <p className="footer-description">
                                Uma iniciativa de alunos de Computação para facilitar a organização do complexo desportivo da UFCG.
                            </p>
                        </div>
                        <div className="footer-links">
                            <h3>Links Rápidos</h3>
                            <ul>
                                <li>
                                    <a href="#inicio">Início</a>
                                </li>
                                <li>
                                    <a href="#porque-escolher">Por que escolher?</a>
                                </li>
                                <li>
                                    <a href="#criar-conta">Criar conta</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h3>Contato</h3>
                            <ul>
                                <li className="footer-contact-item">
                                    <svg
                                        className="contact-icon"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>contato@racha10.com.br</span>
                                </li>
                                <li className="footer-contact-item">
                                    <svg
                                        className="contact-icon"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span>(83) 99840-5559</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        
                        <div className="footer-social">
                            <a href="https://wa.me/5583998405559" className="social-icon" target="_blank" rel="noopener noreferrer">
                                <svg className="icon" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.059.623 3.977 1.69 5.562L2 22l4.69-1.69A9.945 9.945 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.945 7.945 0 01-4.287-1.207l-.31-.197-2.785 1.002 1.002-2.785-.197-.31A7.945 7.945 0 014 12a8 8 0 1116 0 8 8 0 01-8 8zm3.542-5.963c-.197-.099-1.171-.576-1.353-.642-.182-.066-.314-.099-.446.099-.132.198-.51.641-.625.775-.115.132-.23.149-.427.05-.197-.099-.832-.306-1.586-.975-.586-.522-.983-1.17-1.099-1.367-.115-.198-.012-.305.086-.403.089-.088.197-.23.296-.344.099-.115.132-.197.198-.33.066-.132.033-.248-.017-.347-.049-.099-.446-1.085-.611-1.484-.161-.387-.326-.333-.446-.34a9.35 9.35 0 00-.38-.007c-.132 0-.347.05-.528.248-.182.198-.692.676-.692 1.647s.709 1.914.81 2.048c.099.132 1.394 2.127 3.372 2.983 1.184.511 1.645.552 2.232.472.36-.053 1.171-.478 1.337-.94.165-.462.165-.856.116-.94-.05-.083-.165-.132-.363-.231z" />
                                </svg>
                            </a>
                        </div>


                        <p className="footer-bottom-text">
                            &copy; 2025 Racha10. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;