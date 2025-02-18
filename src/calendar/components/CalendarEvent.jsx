
export const CalendarEvent = (e) => {
    
    const { title, user } = e;
    
  return (
    <>
        <strong className="small">{ title }</strong>
        <span>- { user }</span>
    </>
  )
}
