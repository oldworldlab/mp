<Box className="container" sx={{ backgroundColor: '#1a1a1a', padding: 3 }}>
  <Typography variant="h4" className="glow-effect">Marketplace</Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {items.map(item => (
      <Card key={item.name} sx={{ width: 300, backgroundColor: '#333333', color: '#e0e0e0' }}>
        <Typography variant="h6" sx={{ color: '#00d1ff', textShadow: '0 0 5px #00d1ff' }}>{item.name}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>Price: {item.price} ETH</Typography>
      </Card>
    ))}
  </Box>
</Box>
