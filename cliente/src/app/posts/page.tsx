const fetchPosts = () => {
    return fetch('http://localhost:3000/news').then(res => res.json())
}

export default async function PostsPage({params}){
    const posts = await fetchPosts()
    
    return (
        <section>
            <header style={{ backgroundColor: '#333', padding: '20px' }}>
                <h2 style={{ color: '#fff', fontSize: '24pt', margin: '0 0 10px 0' }}>HN Feed</h2>
                <h2 style={{ color: '#fff', fontSize: '20pt', margin: 0 }}>We love HN News</h2>
            </header>
            {posts.map(post => (
                <article 
                    key={post.objectID} 
                    style={{ 
                        display: 'flex',  
                        backgroundColor: '#fff', 
                        border: '1px solid #ccc',  // Se ha corregido para incluir 'solid'
                        marginBottom: '1px',
                        padding: '10px', // Añadido para un poco de espacio interior
                        alignItems: 'center' // Añadido para alinear los elementos verticalmente
                    }}
                >
                    <h2 style={{ color: '#333', fontSize: '13pt', margin: '0 10px 0 0' }}>{post.titulo}</h2>
                    <h3 style={{ color: '#999', margin: '0 10px' }}>--{post.autor}--</h3>
                    <h3 style={{ margin: 0 }}>{post.created_at}</h3>
                </article>
            ))}
        </section>
    );
}