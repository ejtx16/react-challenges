import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex gap-4 flex-col items-center justify-center h-screen'>
      <Link to="/rock-paper-scissors" className='bg-blue-500 text-white p-4 rounded-md'>Rock Paper Scissors</Link>
      <Link to="/stop-watch" className='bg-blue-500 text-white p-4 rounded-md'>Stop Watch</Link>
      <Link to="/dice" className='bg-blue-500 text-white p-4 rounded-md'>Dice</Link>
      <Link to="/traffic-lights" className='bg-blue-500 text-white p-4 rounded-md'>Traffic Lights</Link>
      <Link to="/random-qoutes" className='bg-blue-500 text-white p-4 rounded-md'>Random Qoutes</Link>
      <Link to="/gradient" className='bg-blue-500 text-white p-4 rounded-md'>Gradient</Link>
    </div>
  )
}
