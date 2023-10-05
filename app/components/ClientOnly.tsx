'use client'


// Client only ensures that the wrapped components (children) only get rendered on the client side after the initial mount, and not during server-side rendering or static generation.
import React, { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
  children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) {
      return null;
    }
  
    return (
      <>
        {children}
      </>
    
  )
}

export default ClientOnly;