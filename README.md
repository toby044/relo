# Relo - Harry Potter Database

A Next.js application that displays Harry Potter characters, spells, books, and houses data from the [Potter API](https://potterapi-fedeperin.vercel.app).

## 🧙‍♂️ Features

- **Characters**: Browse wizards, witches, and magical creatures
- **Spells**: Explore magical spells and their uses  
- **Books**: View the complete Harry Potter book series
- **Houses**: Learn about the four Hogwarts houses
- **Admin Panel**: Fetch and update data from the Potter API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/toby044/relo.git
cd relo
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon public key from Settings > API
3. The application will automatically create the required tables when you first use the admin panel

## 📊 Database Schema

The application creates the following tables in Supabase:

- **characters**: fullName, nickname, hogwartsHouse, interpretedBy, children, image, birthdate
- **spells**: spell, use  
- **books**: title, originalTitle, releaseDate, description, pages, cover
- **houses**: house, emoji, founder, colors, animal

## 🔧 Usage

1. **Admin Panel**: Visit `/admin` to fetch the latest data from the Potter API
2. **Browse Data**: Navigate through Characters, Spells, Books, and Houses pages
3. **Automatic Setup**: Tables are created automatically on first data fetch

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Linting**: Biome

## 📡 API Source

Data is fetched from the [Potter API](https://potterapi-fedeperin.vercel.app):
- Characters: `/en/characters`
- Spells: `/en/spells` 
- Books: `/en/books`
- Houses: `/en/houses`

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)

Make sure to set your environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the linter: `npm run lint`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Potter API](https://potterapi-fedeperin.vercel.app) for providing the Harry Potter data
- [Supabase](https://supabase.com) for the database platform
- [Next.js](https://nextjs.org) for the React framework
