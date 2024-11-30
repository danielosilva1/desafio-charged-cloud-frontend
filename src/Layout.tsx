// Define se o header será ou não mostrado (renderiza o header condicionalmente)
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation(); // Recupera a 'localização' da tela que está sendo renderizada

    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        if (location.pathname === '/') {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [location]);

    return (
        <>
            {showHeader && children}
        </>
    );
}

export default Layout;