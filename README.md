# Calculator App

A comprehensive calculator application built with Next.js, React, and Tailwind CSS. This application provides various calculators including basic arithmetic, scientific, financial, health metrics, and unit converters.

## Features

- **Basic Calculator**: Standard arithmetic operations
- **Math & Engineering**: Scientific calculations, matrices, quadratic equations
- **Financial Calculator**: Loan payments, interest rates, investments
- **Health Calculator**: BMI, calorie intake, body fat percentage
- **Unit Converters**: Length, weight, temperature, and more
- **Miscellaneous**: Age calculator, percentage calculator

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - JavaScript library for user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd calculator-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
calculator-app/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS styles
│   └── utils/         # Utility functions
├── public/           # Static files
├── package.json      # Dependencies and scripts
└── README.md        # Project documentation
```

## Deployment on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com).

1. Create a Vercel account if you haven't already
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy the project:
```bash
vercel
```

5. For production deployment:
```bash
vercel --prod
```

## Environment Variables

No environment variables are required for basic functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for the hosting platform
- All contributors who help improve this project
