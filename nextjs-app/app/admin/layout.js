// Admin layout: vollbild, überdeckt Header und Footer der Hauptseite
export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'white',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}
