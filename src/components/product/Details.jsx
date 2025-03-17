import { Typography, Paper, Box, Divider } from "@mui/material";

const Details = () => {
  return (
    <div >
      <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        The <strong>K2 Opula KCL-1029 Screen Cleaning Kit (100ML)</strong> is the ideal solution
        for keeping your screens crystal clear and free from smudges...
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        Key Features and Benefits
      </Typography>

      {/* Features List */}
      <Box sx={{ mb: 2 }}>
        {[
          { title: "Effective Cleaning Solution", text: "The 100ML cleaning solution is specially formulated to eliminate grime without damaging your screens. Its non-abrasive properties ensure a thorough clean while preserving the integrity of your devices." },
          { title: "Generous Volume", text: "With 100ML of cleaning solution, this kit provides ample quantity for multiple uses. Enjoy long-lasting cleanliness for all your devices without worrying about running out quickly." },
          { title: "Included Microfiber Cloth", text: "The kit comes with a premium microfiber cloth that enhances cleaning efficiency. This soft cloth is designed to lift dirt and oils effectively, leaving your screens streak-free." },
          { title: "Compact Design", text: "The K2 Opula KCL-1029 is compact and easy to store, making it perfect for use at home, in the office, or on the go. Keep it handy in your bag or desk for quick access whenever needed." },
          { title: "Eco-Friendly", text: "The cleaning solution is made from eco-friendly ingredients, ensuring a safe cleaning experience for both you and the environment. Enjoy a clean screen without the worry of harmful chemicals." },
        ].map((feature, index) => (
          <Typography key={index} variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            <strong>{feature.title}:</strong> {feature.text}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Maintenance Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        How to Maintain Your Screens with the K2 Opula KCL-1029
      </Typography>

      <Box sx={{ mb: 2 }}>
        {[
          { title: "Routine Cleaning", text: "Establish a regular cleaning routine to prevent buildup of dust and fingerprints. This helps maintain the clarity and performance of your devices." },
          { title: "Proper Application", text: "When using the cleaning solution, apply a small amount to the microfiber cloth rather than directly on the screen. This minimizes the risk of excess moisture getting into device openings." },
          { title: "Gentle Wiping", text: "Use gentle, circular motions while cleaning to lift dirt effectively without scratching the surface. Avoid applying too much pressure during the process." },
          { title: "Storage", text: "Store the cleaning kit in a cool, dry place, away from direct sunlight. Proper storage helps maintain the effectiveness of the solution and cloth over time." },
          { title: "Regular Replacement", text: "Replace the microfiber cloth when it becomes worn or excessively dirty. A clean cloth ensures the best cleaning results every time." },
        ].map((step, index) => (
          <Typography key={index} variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            <strong>{step.title}:</strong> {step.text}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Call to Action */}
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        paragraph
        sx={{ fontSize: { xs: "0.875", md: "1rem" } }}
      >
        Keep your screens looking pristine with the K2 Opula KCL-1029 Screen Cleaning Kit (100ML)!
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        Visit <strong>Ryans Computer</strong> today to purchase this essential accessory and explore our extensive range of computer and electronic products. Ensure your devices shine bright and stay in top condition!
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Pricing Section */}
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        What is the price of K2 Opula KCL-1029 Accessories in Bangladesh?
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
        The price of <strong>K2 Opula KCL-1029 Accessories</strong> starts from <strong>180 BDT</strong>. The price may vary due to customization and product availability. You can buy K2 Opula KCL-1029 Accessories from our website or visit our showrooms nearby.
      </Typography>
      </div>
  );
};

export default Details;
