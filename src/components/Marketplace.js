<div className="container">
  <Typography variant="h4">Marketplace</Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {items.map(item => (
      <Card key={item.name} sx={{ width: 300 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>Price: {item.price} ETH</Typography>
      </Card>
    ))}
  </Box>
</div>
