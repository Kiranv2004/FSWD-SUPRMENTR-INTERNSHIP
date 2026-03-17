# 🚀 Quick Start Guide

## Step-by-Step Setup

### 1. Install Dependencies
Open your terminal/command prompt in the project directory and run:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using pnpm:**
```bash
pnpm install
```

### 2. Start Development Server
Run the following command:

**Using npm:**
```bash
npm run dev
```

**Using yarn:**
```bash
yarn dev
```

**Using pnpm:**
```bash
pnpm dev
```

### 3. Open in Browser
The application will automatically open (or you can manually navigate to):
```
http://localhost:3000
```

---

## 📋 What Gets Installed

The project includes:
- ✅ React 18.2 - App framework
- ✅ Vite - Lightning-fast build tool
- ✅ Framer Motion - Animation library
- ✅ @vitejs/plugin-react - React plugin for Vite

---

## 🎯 Features You Can Try Immediately

1. **Add Tasks**
   - Type in the input box
   - Press Enter or click "Add Task"

2. **Complete Tasks**
   - Click the circle checkbox ○
   - Task gets strikethrough ✓

3. **Edit Tasks**
   - Hover over a task
   - Click the pencil ✎ icon
   - Make changes and press Enter

4. **Delete Tasks**
   - Click the trash 🗑️ icon
   - Task disappears with animation

5. **Filter Tasks**
   - Click "All Tasks", "Pending", or "Completed"

6. **Toggle Dark Mode**
   - Click the moon/sun icon in header
   - Preference saves automatically

7. **Automatic Saving**
   - Tasks save to browser storage
   - Refresh the page - your tasks remain!

---

## 🛠️ Troubleshooting

### "Command not found: npm"
→ Install Node.js from https://nodejs.org/

### Port 3000 already in use?
→ Vite automatically uses the next available port (check terminal)

### Module not found errors?
→ Run `npm install` again
→ Delete `node_modules` folder and run `npm install`

### Animations not working?
→ Check browser console (F12) for errors
→ Ensure JavaScript is enabled

---

## 📚 Project Structure

```
src/
├── App.jsx           ← Main component
├── main.jsx          ← Entry point
├── components/
│   ├── TaskInput.jsx ← Input form
│   ├── TaskList.jsx  ← List container
│   └── TaskItem.jsx  ← Single task
└── styles/
    ├── index.css     ← Global styles
    ├── App.css
    ├── TaskInput.css
    ├── TaskList.css
    └── TaskItem.css
```

---

## 🎓 Next Steps

1. Try all the features
2. Edit CSS files to customize colors
3. Read the README.md for full documentation
4. Explore the component code to learn React patterns

---

**Happy task managing! 🎉**
