SELECT q.id, q.quote, i.id, i.img
FROM quotes q 
JOIN images i ON i.admin_approved = q.admin_approved
WHERE i.admin_approved = true AND q.id = $1 AND i.id = $2;