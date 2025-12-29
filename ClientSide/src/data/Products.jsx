export const PRODUCTS = [
    {
            id: 1,
            title: "Robe d'été Fleurie",
            price: 79.99,
            description: "Belle robe d'été avec motifs floraux, parfaite pour les journées ensoleillées. Tissu léger et respirant, coupe flatteuse.",
            category: "Vêtements",
            badge: "Nouveau",
            rating: 4.5,
            reviews: 28,
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Rose", "Bleu", "Blanc"]
        },
        {
            id: 2,
            title: "Sac à Main Rose",
            price: 149.99,
            description: "Sac à main élégant en cuir synthétique rose avec fermeture dorée. Grande capacité de rangement avec plusieurs compartiments.",
            category: "Accessoires",
            badge: "Tendance",
            rating: 4.8,
            reviews: 45,
            colors: ["Rose", "Noir", "Beige"]
        },
        {
            id: 3,
            title: "Chaussures à Talons",
            price: 89.99,
            description: "Chaussures à talons confortables pour toutes occasions. Talon de 7cm, semelle intérieure rembourrée pour un confort optimal.",
            category: "Chaussures",
            badge: null,
            rating: 4.3,
            reviews: 32,
            sizes: ["36", "37", "38", "39", "40", "41"],
            colors: ["Noir", "Nude", "Rouge"]
        },
        {
            id: 4,
            title: "Bijoux Fantaisie",
            price: 29.99,
            description: "Ensemble de bijoux fantaisie avec cristaux roses. Comprend un collier et des boucles d'oreilles assorties.",
            category: "Bijoux",
            badge: "-20%",
            rating: 4.6,
            reviews: 67,
            colors: ["Or rose", "Argent", "Or"]
        },
        {
            id: 5,
            title: "Parfum Floral",
            price: 65.99,
            description: "Parfum aux notes florales fraîches et féminines. Notes de tête: rose et jasmin. Notes de cœur: muguet. Notes de fond: musc blanc.",
            category: "Beauté",
            badge: "Best-seller",
            rating: 4.9,
            reviews: 112,
            sizes: ["30ml", "50ml", "100ml"]
        },
        {
            id: 6,
            title: "Top Dentelle",
            price: 45.99,
            description: "Top en dentelle délicate, idéal pour les soirées. Col rond, manches courtes, fermeture éclair au dos.",
            category: "Vêtements",
            badge: null,
            rating: 4.4,
            reviews: 23,
            sizes: ["XS", "S", "M", "L"],
            colors: ["Blanc", "Noir", "Rose pâle"]
        },
        {
            id: 7,
            title: "Lunettes de Soleil",
            price: 55.99,
            description: "Lunettes de soleil tendance avec protection UV400. Monture légère et résistante, verres polarisés.",
            category: "Accessoires",
            badge: "Nouveau",
            rating: 4.7,
            reviews: 41,
            colors: ["Rose", "Noir", "Doré"]
        },
        {
            id: 8,
            title: "Trousse de Maquillage",
            price: 35.99,
            description: "Trousse de maquillage complète avec 12 pièces. Inclut fards à paupières, rouges à lèvres, et blush.",
            category: "Beauté",
            badge: null,
            rating: 4.5,
            reviews: 56,
            colors: ["Collection Rose", "Collection Nude"]
        },
        {
            id: 9,
            title: "Jupe Plissée",
            price: 52.99,
            description: "Jupe plissée mi-longue en tissu fluide. Taille élastique pour un confort optimal, parfaite pour toutes les occasions.",
            category: "Vêtements",
            badge: "Tendance",
            rating: 4.6,
            reviews: 34,
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Rose", "Noir", "Beige", "Bleu marine"]
        },
        {
            id: 10,
            title: "Montre Élégante",
            price: 129.99,
            description: "Montre élégante avec bracelet en cuir et cadran rose gold. Mouvement à quartz, résistante à l'eau.",
            category: "Accessoires",
            badge: "Best-seller",
            rating: 4.8,
            reviews: 89,
            colors: ["Rose gold", "Argent", "Or"]
        },
        {
            id: 11,
            title: "Écharpe en Soie",
            price: 39.99,
            description: "Écharpe en soie pure avec motifs floraux. Douce et légère, dimensions généreuses pour multiples styles.",
            category: "Accessoires",
            badge: null,
            rating: 4.7,
            reviews: 38,
            colors: ["Rose", "Violet", "Multicolore"]
        },
        {
            id: 12,
            title: "Crème Hydratante",
            price: 42.99,
            description: "Crème hydratante visage 24h avec extrait de rose et acide hyaluronique. Texture légère non grasse.",
            category: "Beauté",
            badge: "Nouveau",
            rating: 4.9,
            reviews: 73,
            sizes: ["50ml", "100ml"]
        }]
export const CATEGORIES_DATA = [ 
        
    {
        id: 'vetements',
        name: 'Vêtements',
        icon: 'fa-shirt',
        description: 'Découvrez notre collection de vêtements tendance',
        count: 145
    },
    {
        id: 'accessoires',
        name: 'Accessoires',
        icon: 'fa-bag-shopping',
        description: 'Complétez votre look avec nos accessoires',
        count: 89
    },
    {
        id: 'chaussures',
        name: 'Chaussures',
        icon: 'fa-shoe-prints',
        description: 'Trouvez la paire parfaite pour chaque occasion',
        count: 67
    },
    {
        id: 'bijoux',
        name: 'Bijoux',
        icon: 'fa-gem',
        description: 'Brillez avec nos bijoux élégants',
        count: 124
    },
    {
        id: 'beaute',
        name: 'Beauté',
        icon: 'fa-wand-magic-sparkles',
        description: 'Produits de beauté et soins de qualité',
        count: 98
    }
];

export const MOCK_ORDERS = [
    {
        id: 1,
        number: "CMD-2024-001",
        date: "2024-03-15",
        status: "livree",
        total: 229.98,
        items: [
            { productId: 1, title: "Robe d'été Fleurie", quantity: 1, price: 79.99 },
            { productId: 2, title: "Sac à Main Rose", quantity: 1, price: 149.99 }
        ],
        shipping: {
            name: "Sophie Martin",
            address: "123 Rue de la Paix",
            city: "Paris",
            postalCode: "75001",
            country: "France"
        }
    },
    {
        id: 2,
        number: "CMD-2024-015",
        date: "2024-03-10",
        status: "expediee",
        total: 89.99,
        items: [
            { productId: 3, title: "Chaussures à Talons", quantity: 1, price: 89.99 }
        ],
        shipping: {
            name: "Sophie Martin",
            address: "123 Rue de la Paix",
            city: "Paris",
            postalCode: "75001",
            country: "France"
        }
    },
    {
        id: 3,
        number: "CMD-2024-008",
        date: "2024-02-28",
        status: "en-attente",
        total: 95.98,
        items: [
            { productId: 5, title: "Parfum Floral", quantity: 1, price: 65.99 },
            { productId: 4, title: "Bijoux Fantaisie", quantity: 1, price: 29.99 }
        ],
        shipping: {
            name: "Sophie Martin",
            address: "123 Rue de la Paix",
            city: "Paris",
            postalCode: "75001",
            country: "France"
        }
    }
];

// Mock user data
export const MOCK_USER = {
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris, France"
};