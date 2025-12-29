import React from 'react'
export default function Footer(){
  return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>À propos de GirlyShop</h3>
                    <p>Votre destination mode pour des vêtements et accessoires tendance. Nous proposons une sélection soignée de produits de qualité pour toutes les occasions.</p>
                    <div className="social-links">
                        <button className="social-btn"><i className="fab fa-facebook-f"></i></button>
                        <button className="social-btn"><i className="fab fa-instagram"></i></button>
                        <button className="social-btn"><i className="fab fa-twitter"></i></button>
                        <button className="social-btn"><i className="fab fa-pinterest"></i></button>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Navigation</h3>
                    <ul className="footer-links">
                        <li>
                            <a onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
                                <i className="fas fa-chevron-right"></i> Accueil
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>
                                <i className="fas fa-chevron-right"></i> Boutique
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>
                                <i className="fas fa-chevron-right"></i> Contact
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); navigateTo('account'); }}>
                                <i className="fas fa-chevron-right"></i> Mon compte
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Informations</h3>
                    <ul className="footer-links">
                        <li><a><i className="fas fa-chevron-right"></i> Conditions générales</a></li>
                        <li><a><i className="fas fa-chevron-right"></i> Politique de confidentialité</a></li>
                        <li><a><i className="fas fa-chevron-right"></i> Livraison & Retours</a></li>
                        <li><a><i className="fas fa-chevron-right"></i> FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p><i className="fas fa-map-marker-alt"></i> 123 Rue de la Mode, 75008 Paris</p>
                    <p><i className="fas fa-phone"></i> +33 1 23 45 67 89</p>
                    <p><i className="fas fa-envelope"></i> contact@girlyshop.fr</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 GirlyShop. Tous droits réservés. Créé avec <i className="fas fa-heart" style={{ color: '#ffb6c1' }}></i></p>
            </div>
        </footer>
  )
}
