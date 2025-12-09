const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SHEET_ID = import.meta.env.VITE_SHEET_ID
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets'

const formatRows = (rows) => {
  if (!rows || rows.length < 2) return []
  
  const headers = rows[0].map(h => h.toLowerCase().trim()) 
  const data = rows.slice(1)

  return data.map(row => {
    const obj = {}
    
    headers.forEach((header, index) => {
      let value = row[index] || ''
      
      if (header === 'tags') {
        obj[header] = value ? value.split(',').map(t => t.trim()) : []
      } else {
        obj[header] = value
      }
    })
    
    // === UPDATED IMAGE LOGIC ===
    if (!obj.image) {
      // Fallback if cell is empty
      obj.image = 'https://via.placeholder.com/400x200/1a1a1a/007A33?text=No+Image'
    } else if (!obj.image.startsWith('http')) {
      // If user typed "blogphoto-1.jpg", look in public/images/ folder
      obj.image = '/images/' + obj.image.trim()
    }
    
    return obj
  })
}

export const fetchPosts = async () => {
  try {
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

export const fetchSongs = async () => {
  try {
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