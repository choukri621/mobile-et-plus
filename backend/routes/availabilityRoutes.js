const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.post('/disponibilites', (req, res) => {
  const { date_dispo, heure_dispo } = req.body

  db.query(
    'INSERT INTO disponibilites (date_dispo, heure_dispo) VALUES (?, ?)',
    [date_dispo, heure_dispo],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: 'Disponibilité ajoutée' })
    }
  )
})

router.get('/disponibilites', (req, res) => {
  db.query(
    'SELECT * FROM disponibilites WHERE disponible = TRUE ORDER BY date_dispo, heure_dispo',
    (err, results) => {
      if (err) return res.status(500).json(err)
      res.json(results)
    }
  )
})

router.post('/rendez-vous', (req, res) => {
  const { disponibilite_id, nom, email, telephone, message } = req.body

  db.query(
    'INSERT INTO rendez_vous (disponibilite_id, nom, email, telephone, message) VALUES (?, ?, ?, ?, ?)',
    [disponibilite_id, nom, email, telephone, message],
    (err) => {
      if (err) return res.status(500).json(err)

      db.query(
        'UPDATE disponibilites SET disponible = FALSE WHERE id = ?',
        [disponibilite_id],
        (err2) => {
          if (err2) return res.status(500).json(err2)
          res.json({ message: 'Rendez-vous réservé' })
        }
      )
    }
  )
})

router.get('/rendez-vous', (req, res) => {
  const sql = `
    SELECT rv.*, d.date_dispo, d.heure_dispo
    FROM rendez_vous rv
    JOIN disponibilites d ON rv.disponibilite_id = d.id
    ORDER BY d.date_dispo, d.heure_dispo
  `

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err)
    res.json(results)
  })
})

module.exports = router