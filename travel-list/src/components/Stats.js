export function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="footer">
        <em>Please Add Item</em>
      </footer>
    );
  }
  const numLength = items.length;
  const pakedItem = items.filter((el) => el.packed).length;
  const persentage = Math.round((pakedItem / numLength) * 100);
  return (
    <footer className="footer">
      <em>
        {persentage !== 100
          ? `You hava ${numLength} item in your list You have already packed
        ${pakedItem}
        ${persentage} %`
          : `All Ready Just Go Now ✈️`}
      </em>
    </footer>
  );
}
