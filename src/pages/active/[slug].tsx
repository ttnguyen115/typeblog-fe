import axiosClient from "api";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Active() {
  const { slug }: any = useParams();
  const [err, setErr] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    if (slug) {
      axiosClient.post('active', { active_token: slug })
        .then(res => setSuccess(res.data.message))
        .catch(err => setErr(err.response.data.msg));
    }
  }, [slug]);

  return (
    <div>
      {err && toast.error(err)}
      {success && toast.success(success)}
    </div>
  )
}

export default Active