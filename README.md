1. setting (eslint, prettier, tailwindcss)
2. layout setting
3. main page setting
4. create tweet
5. Card UI
6. login
7. signup
8. infinite scroll

---

const ellipsisEl = useRef<HTMLDivElement>(null);
const ellipsisModalHandler = (e: any) => {
if (
ellipsisToggle &&
(!ellipsisEl.current || !ellipsisEl.current.contains(e.target))
) {
setEllipsisToggle(false);
}
};
useEffect(() => {
window.addEventListener('click', ellipsisModalHandler);
console.log(ellipsisEl);

    return window.removeEventListener('click', ellipsisModalHandler);

}, [ellipsisToggle]);

---
