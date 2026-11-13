export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Header & Banner
    appTitle: 'Fiber Fan',
    subtitle: 'Clothing & Lifecycle Impact Module',
    appLogoText: 'Sustaability Matrix',
    dataSourceBtn: 'Data Source',
    heroBadge: 'Educational Sustainability Storefront',
    heroTitle: 'How does your wardrobe impact the planet?',
    heroDescription:
      'Select garments to build an outfit. At Checkout, click on individual items in your cart to reveal deep lifecycle metrics: water consumption, carbon intensity, durability, and end-of-life recyclability.',

    // Filter & Search
    searchPlaceholder: 'Search garments, fibers, points...',
    categoryAll: 'All',
    sortByLabel: 'Sort by:',
    sortFeatured: 'Featured Order',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    sortDurability: 'Highest Durability',
    noResultsTitle: 'No items match your query',
    noResultsDesc: 'Try clearing filters or adjusting your search phrase.',

    // Product Card
    retailPrice: 'Retail Price',
    addToOutfit: 'Add to Outfit',
    addedToOutfit: 'Added to Outfit (+ Add More)',

    // Cart Drawer & Checkout
    selectedOutfit: 'Selected Outfit',
    emptyCartTitle: 'Your outfit collection is empty.',
    emptyCartDesc: 'Add garments from the catalog to evaluate their cumulative impact.',
    viewItemImpact: 'Click any item below to view full lifecycle impact breakdown',
    each: 'each',
    totalCost: 'Total Estimated Cost:',
    proceedCheckout: 'Proceed to Eco-Impact Checkout',
    checkoutTitle: 'Outfit Sustainability Checkout',
    checkoutSubtitle: 'Inspect individual garment footprints before finalizing',
    checkoutBannerTitle: 'Interactive Learning Step:',
    checkoutBannerDesc:
      'Click on any item in your outfit below to launch its full environmental breakdown modal (water impact, fiber composition, longevity & end-of-life options).',
    yourOutfitItems: 'Your Selected Outfit Items',
    qty: 'Qty',
    estimatedFootprint: 'Estimated Outfit Lifecycle Footprint',
    itemsCount: 'Items Count',
    pcs: 'Pcs',
    avgDurability: 'Avg. Durability',
    backToStore: 'Back to Store',
    exportReceiptBtn: 'Export Selection & Impact Data',
    viewItemInfo: 'View Impact Information',

    // Individual Garment Impact Modal
    originLabel: 'Origin / Made in:',
    keyEnvPoint: 'Key Environmental Point',
    composition: 'Composition',
    fiberType: 'Fiber Type',
    envFootprint: 'Environmental Footprint',
    waterImpact: 'Water Impact',
    climateImpact: 'Climate & Carbon Impact',
    durabilityCircularity: 'Durability & Circularity',
    expectedLife: 'Expected Life',
    durabilityScore: 'Durability Score',
    stars: 'Stars',
    repairability: 'Repairability',
    endOfLife: 'End-of-Life',
    dismissAssessment: 'Dismiss Assessment',
    garmentModalTitle: 'Garment Lifecycle Analysis',
    garmentModalSubtitle: 'Educational Impact Breakdown',
    keyEnvImpact: 'Key Environmental Impact',
    addQuantity: 'Add Quantity',
    closeanalysis: 'Close Analysis',

    // Printable Impact Receipt Modal
    receiptTitle: 'Eco-Impact Summary Receipt',
    receiptSubtitle: 'Fiber Fan Educational Lifecycle Assessment',
    dateLabel: 'Date:',
    itemColumn: 'Garment & Material',
    metricsColumn: 'Water, Carbon Impact & EOF Summary',
    priceColumn: 'Price',
    printReceipt: 'Print Receipt',
    closeReceipt: 'Close',
    keepInCart: "Keep Selection in Cart",
    clearCart: 'Clear Cart',
    quantityColumn: 'Quantity',
    lifeExpectancy: 'Life Expectancy',
    checkoutReflection: [
      "The most sustainable clothes are often the ones you already own!",
      "All clothes have an impact on the planet, but how you use them matters too. Think about how long you'll wear them, if you can repair or reuse them, and where they come from.",
      "Don't feel bad about the clothes you already own! Keep wearing them, take care of them, and make the most of what you have. Next time you shop, try to make more thoughtful choices. Every little change counts!"
    ],
    clothingImpactHeader: 'Clothing & Environmental Impact Summary',
    recieptTableHeader: 'Garment & Environmental Footprint Breakdown',
    invoiceImpactTitle: 'INVOICE / IMPACT SUMMARY',

    // Data Source Modal
    manageDataset: 'Manage Product Dataset',
    importSheetTitle: '1. Import Google Spreadsheet (Preferred)',
    importSheetDesc: 'Paste a public Google Sheets share link. CSV data will be cached locally per language.',
    loadLinkBtn: 'Load Link',
    orDivider: 'OR',
    pasteCsvTitle: '2. Paste or Edit Raw CSV Text',
    applyCsvBtn: 'Apply Local CSV Text',
    clearCacheBtn: 'Clear LocalStorage & Reset',
    closeBtn: 'Close',
  },
  fr: {
    // Header & Banner
    appTitle: 'Fiber Fan',
    subtitle: "Module d'impact sur le cycle de vie des vêtements",
    appLogoText: 'Matrice de durabilité',
    dataSourceBtn: 'Source de données',
    heroBadge: 'Vitrine éducative sur la durabilité',
    heroTitle: 'Quel est l’impact de votre garde-robe sur la planète ?',
    heroDescription:
      'Sélectionnez des vêtements pour composer une tenue. À la caisse, cliquez sur chaque article de votre panier pour découvrir son analyse complète : consommation d’eau, empreinte carbone, durabilité et recyclabilité.',

    // Filter & Search
    searchPlaceholder: 'Rechercher des vêtements, fibres, points...',
    categoryAll: 'Tout',
    sortByLabel: 'Trier par :',
    sortFeatured: 'Ordre suggéré',
    sortPriceLow: 'Prix : croissant',
    sortPriceHigh: 'Prix : décroissant',
    sortDurability: 'Durabilité maximale',
    noResultsTitle: 'Aucun article ne correspond à votre recherche',
    noResultsDesc: 'Essayez de réinitialiser les filtres ou de modifier vos mots-clés.',

    // Product Card
    retailPrice: 'Prix de détail',
    addToOutfit: 'Ajouter à la tenue',
    addedToOutfit: 'Ajouté à la tenue (+ Ajouter plus)',

    // Cart Drawer & Checkout
    selectedOutfit: 'Tenue sélectionnée',
    emptyCartTitle: 'Votre sélection de tenue est vide.',
    emptyCartDesc: 'Ajoutez des vêtements du catalogue pour évaluer leur impact cumulé.',
    viewItemImpact: 'Cliquez sur un article ci-dessous pour voir son analyse complète du cycle de vie',
    each: 'chacun',
    totalCost: 'Coût total estimé :',
    proceedCheckout: "Passer à l'évaluation écologique",
    checkoutTitle: 'Bilan écologique de la tenue',
    checkoutSubtitle: "Inspectez l'empreinte de chaque vêtement avant de finaliser",
    checkoutBannerTitle: 'Étape interactive :',
    checkoutBannerDesc:
      "Cliquez sur n'importe quel article de votre tenue ci-dessous pour afficher son bilan environnemental complet (impact sur l'eau, composition des fibres, longévité et fin de vie).",
    yourOutfitItems: 'Articles de votre tenue',
    qty: 'Qté',
    estimatedFootprint: 'Empreinte estimée du cycle de vie',
    itemsCount: "Nombre d'articles",
    pcs: 'Mcx',
    avgDurability: 'Durabilité moy.',
    backToStore: 'Retour à la boutique',
    exportReceiptBtn: 'Exporter la sélection et le bilan',
    viewItemInfo: "Voir l'information d'impact de l'article",

    // Individual Garment Impact Modal
    originLabel: 'Origine / Fabriqué en :',
    keyEnvPoint: 'Point environnemental clé',
    composition: 'Composition',
    fiberType: 'Type de fibre',
    envFootprint: 'Empreinte environnementale',
    waterImpact: "Impact sur l'eau",
    climateImpact: 'Impact climatique et carbone',
    durabilityCircularity: 'Durabilité et circularité',
    expectedLife: 'Durée de vie prévue',
    durabilityScore: 'Indice de durabilité',
    stars: 'Étoiles',
    repairability: 'Réparabilité',
    endOfLife: 'Fin de vie',
    dismissAssessment: "Fermer l'évaluation",
    garmentModalTitle: "Analyse du cycle de vie du vêtement",
    garmentModalSubtitle: "Évaluation éducative du cycle de vie — Fiber Fan",
    keyEnvImpact: "Point environnemental clé",
    addQuantity: 'Ajouter quantité',
    closeanalysis: "Fermer l'analyse",

    // Printable Impact Receipt Modal
    receiptTitle: "Reçu de bilan d'impact écologique",
    receiptSubtitle: 'Évaluation éducative du cycle de vie — Fiber Fan',
    dateLabel: 'Date :',
    itemColumn: 'Vêtement et matière',
    metricsColumn: `Résumé de l'impact sur l'eau, le carbone et l'EOF`,
    priceColumn: 'Prix',
    printReceipt: 'Imprimer le reçu',
    closeReceipt: 'Fermer',
    keepInCart: "Garder la sélection dans le panier",
    clearCart: 'Vider le panier',
    quantityColumn: 'Quantité',
    lifeExpectancy: 'Durée de vie estimée',
    checkoutReflection: [
      "Les vêtements les plus durables sont souvent ceux que vous possédez déjà !",
      "Tous les vêtements ont un impact sur la planète, mais la façon dont vous les utilisez compte aussi. Réfléchissez à la durée pendant laquelle vous les porterez, si vous pouvez les réparer ou les réutiliser, et d'où ils proviennent.",
      "Ne vous sentez pas coupable des vêtements que vous possédez déjà ! Continuez à les porter, prenez-en soin et profitez au maximum de ce que vous avez. La prochaine fois que vous ferez du shopping, essayez de faire des choix plus réfléchis. Chaque petit changement compte !"
    ],
    clothingImpactHeader: "Résumé de l'impact des vêtements et de l'environnement",
    recieptTableHeader: "Analyse de l'empreinte écologique des vêtements",
    invoiceImpactTitle: 'FACTURE / RÉSUMÉ DE L’IMPACT',

    // Data Source Modal
    manageDataset: 'Gérer la source de données',
    importSheetTitle: '1. Importer une feuille Google Sheets (Recommandé)',
    importSheetDesc: 'Collez un lien de partage public Google Sheets. Les données seront mises en cache par langue.',
    loadLinkBtn: 'Charger le lien',
    orDivider: 'OU',
    pasteCsvTitle: '2. Coller ou modifier le texte CSV brut',
    applyCsvBtn: 'Appliquer le CSV local',
    clearCacheBtn: 'Vider le cache et réinitialiser',
    closeBtn: 'Fermer',
  },
} as const;

export type TranslationKeys = typeof translations.en | typeof translations.fr;
