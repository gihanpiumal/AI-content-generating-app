'use client';
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { runAi } from "@/actions/ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"




export default function Page() {
  // state
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")

  const handleClick = async (e: any) => {
    e.preventDefault()

    setLoading(true)
    try {
      const data = await runAi(query)
      setResponse(data)
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }

  return (
    // <>
    //   <Input type="email" placeholder="Email" />
    //   <hr />
    //   <div>{loading ? "Loading..." : response}</div>
    // </>
    <div className="m-5">
      <form onSubmit={handleClick}>
        <Input className="mb-5"
          placeholder="Ask anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button >Run AI</Button>
      </form>
      <Card className="mt-5">
        <CardHeader>AI Respons will appear here..</CardHeader>
        <CardContent>
          {loading ? <div>"Loading..."</div> : <ReactMarkdown>{response}</ReactMarkdown>}
        </CardContent>
      </Card>

    </div>
  )
}