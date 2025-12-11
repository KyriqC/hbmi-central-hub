const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SHEET_ID = import.meta.env.VITE_SHEET_ID
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets'

// Helper function to format Google Sheets rows into clean objects
const formatRows = (rows) => {
  if (!rows || rows.length < 2) return []
  
  // Get headers from the first row and normalize them (lowercase, trimmed)
  const headers = rows[0].map(h => h.toLowerCase().trim()) 
  const data = rows.slice(1)

  return data.map(row => {
    const obj = {}
    
    headers.forEach((header, index) => {
      let value = row[index] || ''
      
      // Special handling for 'tags' column: split by comma
      if (header === 'tags') {
        obj[header] = value ? value.split(',').map(t => t.trim()) : []
      } else {
        obj[header] = value
      }
    })
    
    // === IMAGE LOGIC ===
    // If specific logic is needed for blog images (e.g. local vs external)
    if (headers.includes('image')) {
        if (!obj.image) {
        // Fallback if cell is empty
        obj.image = 'https://via.placeholder.com/400x200/1a1a1a/007A33?text=No+Image'
        } else if (!obj.image.startsWith('http')) {
        // If user typed "blogpost-1.png", look in public/images/ folder
        obj.image = '/images/' + obj.image.trim()
        }
    }
    
    return obj
  })
}

// --- EXPORT 1: Fetch Blog Posts ---
export const fetchPosts = async () => {
  try {
    // Fetches from the "Posts" tab
    const url = `${BASE_URL}/${SHEET_ID}/values/Posts!A1:Z?key=${API_KEY}`
    const response = await fetch(url)
    const result = await response.json()
    if (result.error) throw new Error(result.error.message)
    return formatRows(result.values)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

// --- EXPORT 2: Fetch Songs ---
export const fetchSongs = async () => {
  try {
    // Fetches from the "Songs" tab
    const url = `${BASE_URL}/${SHEET_ID}/values/Songs!A1:Z?key=${API_KEY}`
    const response = await fetch(url)
    const result = await response.json()
    if (result.error) throw new Error(result.error.message)
    return formatRows(result.values)
  } catch (error) {
    console.error("Error fetching songs:", error)
    return []
  }
}