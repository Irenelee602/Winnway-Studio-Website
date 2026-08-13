const encoder = new TextEncoder();
const ADMIN_HTML_B64 = "PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9InpoLUhhbnQiPgo8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+PG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEiPgo8dGl0bGU+V2lubndheSBTdHVkaW/vvZzlhaflrrnnrqHnkIY8L3RpdGxlPgo8c3R5bGU+Cjpyb290ey0taW5rOiMyNTE2MTk7LS13aW5lOiM3YzJkMzg7LS1wYXBlcjojZmJmN2YwOy0tY3JlYW06I2YyZTlkYzstLWxpbmU6I2RmZDNjNn0qe2JveC1zaXppbmc6Ym9yZGVyLWJveH1ib2R5e21hcmdpbjowO2JhY2tncm91bmQ6dmFyKC0tcGFwZXIpO2NvbG9yOnZhcigtLWluayk7Zm9udDoxNXB4LzEuNTUgIk5vdG8gU2FucyBUQyIsIk1pY3Jvc29mdCBKaGVuZ0hlaSIsc2Fucy1zZXJpZn0ud3JhcHttYXgtd2lkdGg6MTEwMHB4O21hcmdpbjphdXRvO3BhZGRpbmc6MzhweCAyMnB4IDgwcHh9aDEsaDJ7Zm9udC1mYW1pbHk6R2VvcmdpYSwiTm90byBTZXJpZiBUQyIsc2VyaWZ9aDF7bWFyZ2luOjA7Zm9udC1zaXplOjM0cHh9LmxlYWQsLmhpbnR7Y29sb3I6Izc0Njc2MX0uYmFye2Rpc3BsYXk6ZmxleDtnYXA6MTBweDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC13cmFwOndyYXA7bWFyZ2luOjEycHggMCAyNnB4fS50YWJzLC5hY3Rpb25ze2Rpc3BsYXk6ZmxleDtnYXA6OHB4O2ZsZXgtd3JhcDp3cmFwfWJ1dHRvbntib3JkZXI6MXB4IHNvbGlkIHZhcigtLXdpbmUpO2JhY2tncm91bmQ6I2ZmZjtjb2xvcjp2YXIoLS13aW5lKTtwYWRkaW5nOjlweCAxM3B4O2ZvbnQ6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcn0ucHJpbWFyeSwudGFiLmFjdGl2ZXtiYWNrZ3JvdW5kOnZhcigtLXdpbmUpO2NvbG9yOiNmZmZ9LnBhbmVse2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUpO3BhZGRpbmc6MjRweDttYXJnaW4tdG9wOjE4cHh9LmhpZGRlbntkaXNwbGF5Om5vbmV9LmZpZWxkc3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdCgyLG1pbm1heCgwLDFmcikpO2dhcDoxM3B4fS5mdWxse2dyaWQtY29sdW1uOjEvLTF9bGFiZWx7ZGlzcGxheTpncmlkO2dhcDo1cHg7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NzAwfWlucHV0LHRleHRhcmVhLHNlbGVjdHt3aWR0aDoxMDAlO2JvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZSk7cGFkZGluZzoxMHB4O2JhY2tncm91bmQ6I2ZmZjtmb250OmluaGVyaXR9dGV4dGFyZWF7bWluLWhlaWdodDoxMTBweH0ubGlzdHtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1saW5lKTttYXJnaW4tdG9wOjIycHh9Lml0ZW17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDoxMnB4O3BhZGRpbmc6MTFweCAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWxpbmUpfS5pdGVtIHNtYWxse2NvbG9yOiM3NTY4NjF9LnN0YXR1c3tmb250LXdlaWdodDo3MDA7Y29sb3I6IzM1NjQ0NH0uaGlzdG9yeXtwYWRkaW5nOjEwcHggMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1saW5lKX1AbWVkaWEobWF4LXdpZHRoOjY4MHB4KXsuZmllbGRze2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnJ9LmZ1bGx7Z3JpZC1jb2x1bW46YXV0b30ud3JhcHtwYWRkaW5nOjI4cHggMTZweH19Cjwvc3R5bGU+CjxtYWluIGNsYXNzPSJ3cmFwIj48aDE+V2lubndheSBTdHVkaW/vvZzlhaflrrnnrqHnkIY8L2gxPjxwIGNsYXNzPSJsZWFkIj7lnKjpgJnoo6HmlrDlop7miJbkv67mlLnphZLmrL7oiIfntIXphZLnmb7np5HvvJvmjInkuIvlhLLlrZjlvozvvIzmraPlvI/ntrLnq5nmnIPnq4vljbPlkIzmraXjgII8L3A+CjxkaXYgY2xhc3M9ImJhciI+PGRpdiBjbGFzcz0idGFicyI+PGJ1dHRvbiBjbGFzcz0idGFiIGFjdGl2ZSIgZGF0YS10YWI9IndpbmUiPumFkuasvueuoeeQhjwvYnV0dG9uPjxidXR0b24gY2xhc3M9InRhYiIgZGF0YS10YWI9Indpa2kiPueZvuenkeeuoeeQhjwvYnV0dG9uPjxidXR0b24gY2xhc3M9InRhYiIgZGF0YS10YWI9Imhpc3RvcnkiPuS/ruaUuee0gOmMhDwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9ImFjdGlvbnMiPjxhIGhyZWY9Ii8iIHN0eWxlPSJjb2xvcjppbmhlcml0Ij48YnV0dG9uIHR5cGU9ImJ1dHRvbiI+6L+U5Zue57ay56uZPC9idXR0b24+PC9hPjxhIGhyZWY9Ii9hcGkvbG9nb3V0IiBzdHlsZT0iY29sb3I6aW5oZXJpdCI+PGJ1dHRvbiB0eXBlPSJidXR0b24iPueZu+WHujwvYnV0dG9uPjwvYT48L2Rpdj48L2Rpdj4KPHNlY3Rpb24gY2xhc3M9InBhbmVsIiBpZD0id2luZVBhbmVsIj48aDI+5paw5aKe77yP5L+u5pS56YWS5qy+PC9oMj48cCBjbGFzcz0iaGludCI+54Wn54mH6KuL5Y+m5aSW5LiK5YKz5YiwIEdpdEh1YiDmoLnnm67pjITvvJvmraTomZXnmoTjgIznhafniYfmqpTlkI3jgI3lv4XpoIjlrozlhajnm7jlkIzjgII8L3A+PGxhYmVsPumBuOaTh+aXouaciemFkuasvjxzZWxlY3QgaWQ9IndpbmVTZWxlY3QiPjxvcHRpb24gdmFsdWU9IiI+77yLIOaWsOWinumFkuasvjwvb3B0aW9uPjwvc2VsZWN0PjwvbGFiZWw+PGZvcm0gaWQ9IndpbmVGb3JtIj48ZGl2IGNsYXNzPSJmaWVsZHMiPjxsYWJlbD7kuK3mlofphZLlkI08aW5wdXQgbmFtZT0ibmFtZSIgcmVxdWlyZWQ+PC9sYWJlbD48bGFiZWw+6Iux5paH6YWS5ZCNPGlucHV0IG5hbWU9ImVuZ2xpc2hOYW1lIiByZXF1aXJlZD48L2xhYmVsPjxsYWJlbD7phZLojoo8aW5wdXQgbmFtZT0id2luZXJ5Ij48L2xhYmVsPjxsYWJlbD7lnIvlrrY8aW5wdXQgbmFtZT0iY291bnRyeSI+PC9sYWJlbD48bGFiZWw+55Si5Y2APGlucHV0IG5hbWU9InJlZ2lvbiI+PC9sYWJlbD48bGFiZWw+6JGh6JCE5ZOB56iuPGlucHV0IG5hbWU9ImdyYXBlIj48L2xhYmVsPjxsYWJlbD7lj4PogIPlg7nmoLw8aW5wdXQgbmFtZT0icHJpY2UiIHBsYWNlaG9sZGVyPSLkvovlpoLvvJpOVCQzLDAwMOKAkzQsMDAwIj48L2xhYmVsPjxsYWJlbD7nhafniYfmqpTlkI08aW5wdXQgbmFtZT0iaW1hZ2UiIHBsYWNlaG9sZGVyPSLkvovlpoLvvJpteS13aW5lLnBuZyI+PC9sYWJlbD48bGFiZWw+6YWS6auU77yIMeKAkzXvvIk8aW5wdXQgbmFtZT0iYm9keSIgdHlwZT0ibnVtYmVyIiBtaW49IjEiIG1heD0iNSI+PC9sYWJlbD48bGFiZWw+5Zau5a+n77yIMeKAkzXvvIk8aW5wdXQgbmFtZT0idGFubmluIiB0eXBlPSJudW1iZXIiIG1pbj0iMSIgbWF4PSI1Ij48L2xhYmVsPjxsYWJlbD7phbjluqbvvIgx4oCTNe+8iTxpbnB1dCBuYW1lPSJhY2lkaXR5IiB0eXBlPSJudW1iZXIiIG1pbj0iMSIgbWF4PSI1Ij48L2xhYmVsPjxsYWJlbD7mmK/lkKbmnInlubTku73lg7nmoLw8c2VsZWN0IG5hbWU9Imhhc1ZpbnRhZ2UiPjxvcHRpb24gdmFsdWU9ImZhbHNlIj7mspLmnIk8L29wdGlvbj48b3B0aW9uIHZhbHVlPSJ0cnVlIj7mnIk8L29wdGlvbj48L3NlbGVjdD48L2xhYmVsPjxsYWJlbCBjbGFzcz0iZnVsbCI+6aaZ5rCj5o+P6L+wPGlucHV0IG5hbWU9ImFyb21hIj48L2xhYmVsPjxsYWJlbCBjbGFzcz0iZnVsbCI+5bu66K2w5pCt6aSQPGlucHV0IG5hbWU9InBhaXJpbmciPjwvbGFiZWw+PGxhYmVsIGNsYXNzPSJmdWxsIj7phZLmrL7mlYXkuos8dGV4dGFyZWEgbmFtZT0ic3RvcnkiPjwvdGV4dGFyZWE+PC9sYWJlbD48bGFiZWwgY2xhc3M9ImZ1bGwiPuW5tOS7veiIh+WDueagvO+8iOavj+ihjOOAjOW5tOS7vTog5YO55qC844CN77yJPHRleHRhcmVhIG5hbWU9InZpbnRhZ2VzIiBwbGFjZWhvbGRlcj0iMjAyMTogTlQkMyw2MDAmIzEwOzIwMjA6IE5UJDMsMjAwIj48L3RleHRhcmVhPjwvbGFiZWw+PGxhYmVsPuS/ruaUueS6uuWToeWQjeeosTxpbnB1dCBpZD0id2luZUVkaXRvciIgcmVxdWlyZWQ+PC9sYWJlbD48bGFiZWw+5pys5qyh5L+u5pS55YKZ6Ki7PGlucHV0IGlkPSJ3aW5lTm90ZSIgcGxhY2Vob2xkZXI9IuS+i+Wmgu+8muaWsOWinumFkuasvuOAgeiqv+aVtOWDueagvCI+PC9sYWJlbD48L2Rpdj48cD48YnV0dG9uIGNsYXNzPSJwcmltYXJ5Ij7lhLLlrZjphZLmrL48L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJkZWxldGVXaW5lIj7liKrpmaTmraTphZLmrL48L2J1dHRvbj4gPHNwYW4gY2xhc3M9InN0YXR1cyIgaWQ9IndpbmVTdGF0dXMiPjwvc3Bhbj48L3A+PC9mb3JtPjxkaXYgY2xhc3M9Imxpc3QiIGlkPSJ3aW5lTGlzdCI+PC9kaXY+PC9zZWN0aW9uPgo8c2VjdGlvbiBjbGFzcz0icGFuZWwgaGlkZGVuIiBpZD0id2lraVBhbmVsIj48aDI+5paw5aKe77yP5L+u5pS555m+56eRPC9oMj48bGFiZWw+6YG45pOH5pei5pyJ55m+56eRPHNlbGVjdCBpZD0id2lraVNlbGVjdCI+PG9wdGlvbiB2YWx1ZT0iIj7vvIsg5paw5aKe55m+56eRPC9vcHRpb24+PC9zZWxlY3Q+PC9sYWJlbD48Zm9ybSBpZD0id2lraUZvcm0iPjxkaXYgY2xhc3M9ImZpZWxkcyI+PGxhYmVsPuWkp+WIhumhnjxzZWxlY3QgbmFtZT0iY2F0ZWdvcnkiPjxvcHRpb24+5YiG57SaPC9vcHRpb24+PG9wdGlvbj7lkI3oqZ48L29wdGlvbj48b3B0aW9uPueUouWNgDwvb3B0aW9uPjxvcHRpb24+6JGh6JCE5ZOB56iuPC9vcHRpb24+PC9zZWxlY3Q+PC9sYWJlbD48bGFiZWw+5bCP5qiZ6aGMPGlucHV0IG5hbWU9InRpdGxlIiByZXF1aXJlZD48L2xhYmVsPjxsYWJlbD7mjpLluo/vvIjmlbjlrZfotorlsI/otorliY3vvIk8aW5wdXQgbmFtZT0ib3JkZXIiIHR5cGU9Im51bWJlciIgdmFsdWU9Ijk5Ij48L2xhYmVsPjxsYWJlbD7kv67mlLnkurrlk6HlkI3nqLE8aW5wdXQgaWQ9Indpa2lFZGl0b3IiIHJlcXVpcmVkPjwvbGFiZWw+PGxhYmVsIGNsYXNzPSJmdWxsIj7oqqrmmI7mloflrZc8dGV4dGFyZWEgbmFtZT0iYm9keSIgcmVxdWlyZWQ+PC90ZXh0YXJlYT48L2xhYmVsPjxsYWJlbCBjbGFzcz0iZnVsbCI+5pys5qyh5L+u5pS55YKZ6Ki7PGlucHV0IGlkPSJ3aWtpTm90ZSIgcGxhY2Vob2xkZXI9IuS+i+Wmgu+8muaWsOWinue0jeW4leiwt+S7i+e0uSI+PC9sYWJlbD48L2Rpdj48cD48YnV0dG9uIGNsYXNzPSJwcmltYXJ5Ij7lhLLlrZjnmb7np5E8L2J1dHRvbj4gPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJkZWxldGVXaWtpIj7liKrpmaTmraTnmb7np5E8L2J1dHRvbj4gPHNwYW4gY2xhc3M9InN0YXR1cyIgaWQ9Indpa2lTdGF0dXMiPjwvc3Bhbj48L3A+PC9mb3JtPjxkaXYgY2xhc3M9Imxpc3QiIGlkPSJ3aWtpTGlzdCI+PC9kaXY+PC9zZWN0aW9uPgo8c2VjdGlvbiBjbGFzcz0icGFuZWwgaGlkZGVuIiBpZD0iaGlzdG9yeVBhbmVsIj48aDI+5pyA6L+R5L+u5pS557SA6YyEPC9oMj48ZGl2IGlkPSJoaXN0b3J5TGlzdCI+6K6A5Y+W5Lit4oCmPC9kaXY+PC9zZWN0aW9uPjwvbWFpbj4KPHNjcmlwdD4KbGV0IGNvbnRlbnQ9e3dpbmVzOltdLHdpa2k6W10sdmludGFnZXNCeVdpbmU6e319O2xldCBzZWxlY3RlZFdpbmU9Jycsc2VsZWN0ZWRXaWtpPS0xO2NvbnN0ICQ9cz0+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzKTtjb25zdCBlc2M9dj0+U3RyaW5nKHY/PycnKS5yZXBsYWNlKC9bJjw+IiddL2csYz0+KHsnJic6JyZhbXA7JywnPCc6JyZsdDsnLCc+JzonJmd0OycsJyInOicmcXVvdDsnLCInIjonJiMzOTsnfVtjXSkpO2NvbnN0IGFkbWluUGFzc3dvcmQ9KCk9PnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3dpbm53YXlfYWRtaW5fcGFzc3dvcmQnKXx8Jyc7ZnVuY3Rpb24gc2hvd0FkbWluTG9naW4oKXtkb2N1bWVudC5ib2R5LmlubmVySFRNTD0nPG1haW4gY2xhc3M9IndyYXAiPjxzZWN0aW9uIGNsYXNzPSJwYW5lbCIgc3R5bGU9Im1heC13aWR0aDo1MjBweDttYXJnaW46ODBweCBhdXRvIj48aDE+V2lubndheSBTdHVkaW/vvZzlhaflrrnnrqHnkIY8L2gxPjxwIGNsYXNzPSJsZWFkIj7oq4vovLjlhaXnrqHnkIblvozlj7Dlr4bnorzjgII8L3A+PGZvcm0gaWQ9ImFkbWluTG9naW4iPjxsYWJlbD7nrqHnkIblvozlj7Dlr4bnorw8aW5wdXQgaWQ9ImFkbWluUGFzc3dvcmQiIHR5cGU9InBhc3N3b3JkIiByZXF1aXJlZCBhdXRvZm9jdXM+PC9sYWJlbD48bGFiZWwgc3R5bGU9ImRpc3BsYXk6ZmxleDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6YXV0byAxZnI7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo4cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6MTBweCI+PGlucHV0IGlkPSJzaG93UGFzc3dvcmQiIHR5cGU9ImNoZWNrYm94IiBzdHlsZT0id2lkdGg6YXV0byI+6aGv56S65a+G56K8PC9sYWJlbD48cD48YnV0dG9uIGNsYXNzPSJwcmltYXJ5Ij7pgLLlhaXlvozlj7A8L2J1dHRvbj48L3A+PHAgaWQ9ImxvZ2luRXJyb3IiIHN0eWxlPSJjb2xvcjojOGIyZjNhIj48L3A+PC9mb3JtPjwvc2VjdGlvbj48L21haW4+JzskKCcjc2hvd1Bhc3N3b3JkJykub25jaGFuZ2U9ZT0+JCgnI2FkbWluUGFzc3dvcmQnKS50eXBlPWUudGFyZ2V0LmNoZWNrZWQ/J3RleHQnOidwYXNzd29yZCc7JCgnI2FkbWluTG9naW4nKS5vbnN1Ym1pdD1hc3luYyBlPT57ZS5wcmV2ZW50RGVmYXVsdCgpO2NvbnN0IHBhc3N3b3JkPSQoJyNhZG1pblBhc3N3b3JkJykudmFsdWU7Y29uc3Qgcj1hd2FpdCBmZXRjaCgnL2FwaS9hZG1pbi92ZXJpZnknLHttZXRob2Q6J1BPU1QnLGNyZWRlbnRpYWxzOidpbmNsdWRlJyxoZWFkZXJzOnsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24vanNvbid9LGJvZHk6SlNPTi5zdHJpbmdpZnkoe3Bhc3N3b3JkfSl9KTtjb25zdCBkPWF3YWl0IHIuanNvbigpO2lmKCFyLm9rKXskKCcjbG9naW5FcnJvcicpLnRleHRDb250ZW50PWQuZXJyb3J8fCfpqZforYnlpLHmlZfjgIInO3JldHVybn1zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd3aW5ud2F5X2FkbWluX3Bhc3N3b3JkJyxwYXNzd29yZCk7bG9jYXRpb24ucmVsb2FkKCl9fQphc3luYyBmdW5jdGlvbiBhcGkocGF0aCxvcHRpb25zPXt9KXtjb25zdCByPWF3YWl0IGZldGNoKHBhdGgse2NyZWRlbnRpYWxzOidpbmNsdWRlJywuLi5vcHRpb25zLGhlYWRlcnM6eydjb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi9qc29uJywneC13aW5ud2F5LWFkbWluJzphZG1pblBhc3N3b3JkKCksLi4uKG9wdGlvbnMuaGVhZGVyc3x8e30pfX0pO2NvbnN0IGQ9YXdhaXQgci5qc29uKCk7aWYoIXIub2spdGhyb3cgRXJyb3IoZC5lcnJvcnx8J+WEsuWtmOWkseaVlycpO3JldHVybiBkfQpmdW5jdGlvbiBzbHVnKHYpe3JldHVybiB2LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldKy9nLCctJykucmVwbGFjZSgvKF4tfC0kKS9nLCcnKXx8YHdpbmUtJHtEYXRlLm5vdygpfWB9CmZ1bmN0aW9uIHNldEZvcm0oZm9ybSxkYXRhPXt9KXtbLi4uZm9ybS5lbGVtZW50c10uZm9yRWFjaChlPT57aWYoZS5uYW1lKWUudmFsdWU9ZGF0YVtlLm5hbWVdPz8nJ30pfQpmdW5jdGlvbiB3aW5lRGF0YSh3KXtyZXR1cm4gey4uLncsaGFzVmludGFnZTpTdHJpbmcoQm9vbGVhbih3Lmhhc1ZpbnRhZ2UpKSx2aW50YWdlczooY29udGVudC52aW50YWdlc0J5V2luZVt3LmlkXXx8W10pLm1hcCh2PT5gJHt2LnllYXJ9OiAke3YucHJpY2V9YCkuam9pbignXG4nKX19CmZ1bmN0aW9uIHJlbmRlcldpbmVzKCl7Y29uc3Qgc2VsZWN0PSQoJyN3aW5lU2VsZWN0Jyk7c2VsZWN0LmlubmVySFRNTD0nPG9wdGlvbiB2YWx1ZT0iIj7vvIsg5paw5aKe6YWS5qy+PC9vcHRpb24+Jytjb250ZW50LndpbmVzLnNvcnQoKGEsYik9PihhLm9yZGVyfHwwKS0oYi5vcmRlcnx8MCkpLm1hcCh3PT5gPG9wdGlvbiB2YWx1ZT0iJHtlc2Mody5pZCl9Ij4ke2VzYyh3Lm5hbWUpfe+9nCR7ZXNjKHcuZW5nbGlzaE5hbWUpfTwvb3B0aW9uPmApLmpvaW4oJycpOyQoJyN3aW5lTGlzdCcpLmlubmVySFRNTD1jb250ZW50LndpbmVzLm1hcCh3PT5gPGRpdiBjbGFzcz0iaXRlbSI+PHNwYW4+PGI+JHtlc2Mody5uYW1lKX08L2I+772cJHtlc2Mody5lbmdsaXNoTmFtZSl9PGJyPjxzbWFsbD4ke2VzYyh3LmltYWdlfHwn5bCa5pyq5aGr54Wn54mH5qqU5ZCNJyl9PC9zbWFsbD48L3NwYW4+PGJ1dHRvbiBkYXRhLXdpbmU9IiR7ZXNjKHcuaWQpfSI+57eo6LyvPC9idXR0b24+PC9kaXY+YCkuam9pbignJyl8fCc8cCBjbGFzcz0iaGludCI+5bCa5pyq5pyJ6YWS5qy+44CCPC9wPic7JCgnI3dpbmVMaXN0JykucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtd2luZV0nKS5mb3JFYWNoKGI9PmIub25jbGljaz0oKT0+Y2hvb3NlV2luZShiLmRhdGFzZXQud2luZSkpfQpmdW5jdGlvbiBjaG9vc2VXaW5lKGlkKXtzZWxlY3RlZFdpbmU9aWQ7JCgnI3dpbmVTZWxlY3QnKS52YWx1ZT1pZDtjb25zdCB3PWNvbnRlbnQud2luZXMuZmluZCh4PT54LmlkPT09aWQpO3NldEZvcm0oJCgnI3dpbmVGb3JtJyksd2luZURhdGEod3x8e30pKTskKCcjZGVsZXRlV2luZScpLnN0eWxlLmRpc3BsYXk9dz8naW5saW5lLWJsb2NrJzonbm9uZSd9CmZ1bmN0aW9uIHJlbmRlcldpa2koKXtjb25zdCBzZWxlY3Q9JCgnI3dpa2lTZWxlY3QnKTtzZWxlY3QuaW5uZXJIVE1MPSc8b3B0aW9uIHZhbHVlPSIiPu+8iyDmlrDlop7nmb7np5E8L29wdGlvbj4nK2NvbnRlbnQud2lraS5tYXAoKHgsaSk9PmA8b3B0aW9uIHZhbHVlPSIke2l9Ij4ke2VzYyh4LmNhdGVnb3J5KX3vvZwke2VzYyh4LnRpdGxlKX08L29wdGlvbj5gKS5qb2luKCcnKTskKCcjd2lraUxpc3QnKS5pbm5lckhUTUw9Y29udGVudC53aWtpLm1hcCgoeCxpKT0+YDxkaXYgY2xhc3M9Iml0ZW0iPjxzcGFuPjxiPiR7ZXNjKHguY2F0ZWdvcnkpfTwvYj7vvZwke2VzYyh4LnRpdGxlKX08L3NwYW4+PGJ1dHRvbiBkYXRhLXdpa2k9IiR7aX0iPue3qOi8rzwvYnV0dG9uPjwvZGl2PmApLmpvaW4oJycpfHwnPHAgY2xhc3M9ImhpbnQiPuWwmuacquacieeZvuenkeWFp+WuueOAgjwvcD4nOyQoJyN3aWtpTGlzdCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXdpa2ldJykuZm9yRWFjaChiPT5iLm9uY2xpY2s9KCk9PmNob29zZVdpa2koTnVtYmVyKGIuZGF0YXNldC53aWtpKSkpfQpmdW5jdGlvbiBjaG9vc2VXaWtpKGkpe3NlbGVjdGVkV2lraT1pOyQoJyN3aWtpU2VsZWN0JykudmFsdWU9aTtzZXRGb3JtKCQoJyN3aWtpRm9ybScpLGNvbnRlbnQud2lraVtpXXx8e30pOyQoJyNkZWxldGVXaWtpJykuc3R5bGUuZGlzcGxheT1pPj0wPydpbmxpbmUtYmxvY2snOidub25lJ30KYXN5bmMgZnVuY3Rpb24gc2F2ZShzdW1tYXJ5LGVkaXRvcixub3RlLHN0YXR1cyl7YXdhaXQgYXBpKCcvYXBpL2NvbnRlbnQnLHttZXRob2Q6J1BVVCcsYm9keTpKU09OLnN0cmluZ2lmeSh7Y29udGVudCxlZGl0b3JOYW1lOmVkaXRvcixub3RlLHN1bW1hcnl9KX0pOyQoc3RhdHVzKS50ZXh0Q29udGVudD0n5bey5YSy5a2Y77yM5q2j5byP57ay56uZ5bey5ZCM5q2l44CCJztzZXRUaW1lb3V0KCgpPT4kKHN0YXR1cykudGV4dENvbnRlbnQ9JycsMzUwMCk7YXdhaXQgaGlzdG9yeSgpfQpmdW5jdGlvbiBoaXN0b3J5KCl7cmV0dXJuIGFwaSgnL2FwaS9jb250ZW50L2hpc3RvcnknKS50aGVuKGQ9PnskKCcjaGlzdG9yeUxpc3QnKS5pbm5lckhUTUw9ZC5oaXN0b3J5Lm1hcCh4PT5gPGRpdiBjbGFzcz0iaGlzdG9yeSI+PGI+JHtlc2MoeC5jcmVhdGVkX2F0KX08L2I+772cJHtlc2MoeC5lZGl0b3JfbmFtZSl9PGJyPiR7ZXNjKHguc3VtbWFyeSl9JHt4Lm5vdGU/YDxicj48c21hbGw+JHtlc2MoeC5ub3RlKX08L3NtYWxsPmA6Jyd9PC9kaXY+YCkuam9pbignJyl8fCflsJrnhKHntIDpjITjgIInfSl9CiQoJy50YWJzJykucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpLmZvckVhY2goYj0+Yi5vbmNsaWNrPSgpPT57ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpLmZvckVhY2goeD0+eC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7Yi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtbJ3dpbmUnLCd3aWtpJywnaGlzdG9yeSddLmZvckVhY2gobj0+JCgnIycrbisnUGFuZWwnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nLGIuZGF0YXNldC50YWIhPT1uKSl9KTsKJCgnI3dpbmVTZWxlY3QnKS5vbmNoYW5nZT1lPT5jaG9vc2VXaW5lKGUudGFyZ2V0LnZhbHVlKTskKCcjd2lraVNlbGVjdCcpLm9uY2hhbmdlPWU9PmNob29zZVdpa2koZS50YXJnZXQudmFsdWUpOyQoJyN3aW5lRm9ybScpLm9uc3VibWl0PWFzeW5jIGU9PntlLnByZXZlbnREZWZhdWx0KCk7Y29uc3QgZj1uZXcgRm9ybURhdGEoZS5jdXJyZW50VGFyZ2V0KSxvbGQ9Y29udGVudC53aW5lcy5maW5kKHc9PncuaWQ9PT1zZWxlY3RlZFdpbmUpLGlkPW9sZD8uaWR8fHNsdWcoZi5nZXQoJ2VuZ2xpc2hOYW1lJyl8fGYuZ2V0KCduYW1lJykpO2NvbnN0IHc9e2lkLG9yZGVyOm9sZD8ub3JkZXJ8fE1hdGgubWF4KDAsLi4uY29udGVudC53aW5lcy5tYXAoeD0+TnVtYmVyKHgub3JkZXIpfHwwKSkrMSxuYW1lOmYuZ2V0KCduYW1lJykudHJpbSgpLGVuZ2xpc2hOYW1lOmYuZ2V0KCdlbmdsaXNoTmFtZScpLnRyaW0oKSx3aW5lcnk6Zi5nZXQoJ3dpbmVyeScpLnRyaW0oKSxjb3VudHJ5OmYuZ2V0KCdjb3VudHJ5JykudHJpbSgpLHJlZ2lvbjpmLmdldCgncmVnaW9uJykudHJpbSgpLGdyYXBlOmYuZ2V0KCdncmFwZScpLnRyaW0oKSxwcmljZTpmLmdldCgncHJpY2UnKS50cmltKCksaW1hZ2U6Zi5nZXQoJ2ltYWdlJykudHJpbSgpLGJvZHk6TnVtYmVyKGYuZ2V0KCdib2R5JykpfHxudWxsLHRhbm5pbjpOdW1iZXIoZi5nZXQoJ3Rhbm5pbicpKXx8bnVsbCxhY2lkaXR5Ok51bWJlcihmLmdldCgnYWNpZGl0eScpKXx8bnVsbCxhcm9tYTpmLmdldCgnYXJvbWEnKS50cmltKCkscGFpcmluZzpmLmdldCgncGFpcmluZycpLnRyaW0oKSxzdG9yeTpmLmdldCgnc3RvcnknKS50cmltKCksaGFzVmludGFnZTpmLmdldCgnaGFzVmludGFnZScpPT09J3RydWUnfTtpZihvbGQpT2JqZWN0LmFzc2lnbihvbGQsdyk7ZWxzZSBjb250ZW50LndpbmVzLnB1c2godyk7Y29uc3QgdnM9Zi5nZXQoJ3ZpbnRhZ2VzJykuc3BsaXQoL1xyP1xuLykubWFwKHg9Pnguc3BsaXQoJzonKSkuZmlsdGVyKHg9PngubGVuZ3RoPjEmJnhbMF0udHJpbSgpJiZ4LnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkpLm1hcCh4PT4oe3llYXI6eFswXS50cmltKCkscHJpY2U6eC5zbGljZSgxKS5qb2luKCc6JykudHJpbSgpfSkpO2lmKHZzLmxlbmd0aCljb250ZW50LnZpbnRhZ2VzQnlXaW5lW2lkXT12cztlbHNlIGRlbGV0ZSBjb250ZW50LnZpbnRhZ2VzQnlXaW5lW2lkXTtzZWxlY3RlZFdpbmU9aWQ7YXdhaXQgc2F2ZShgJHtvbGQ/J+S/ruaUuSc6J+aWsOWinid96YWS5qy+77yaJHt3Lm5hbWV9YCxmLmdldCgnd2luZUVkaXRvcicpLGYuZ2V0KCd3aW5lTm90ZScpLCcjd2luZVN0YXR1cycpO3JlbmRlcldpbmVzKCk7Y2hvb3NlV2luZShpZCl9OwokKCcjZGVsZXRlV2luZScpLm9uY2xpY2s9YXN5bmMoKT0+e2NvbnN0IHc9Y29udGVudC53aW5lcy5maW5kKHg9PnguaWQ9PT1zZWxlY3RlZFdpbmUpO2lmKCF3fHwhY29uZmlybShg56K65a6a5Yiq6Zmk44CMJHt3Lm5hbWV944CN77yfYCkpcmV0dXJuO2NvbnRlbnQud2luZXM9Y29udGVudC53aW5lcy5maWx0ZXIoeD0+eC5pZCE9PXcuaWQpO2RlbGV0ZSBjb250ZW50LnZpbnRhZ2VzQnlXaW5lW3cuaWRdO2F3YWl0IHNhdmUoYOWIqumZpOmFkuasvu+8miR7dy5uYW1lfWAscHJvbXB0KCfoq4vovLjlhaXmk43kvZzkurrlk6HlkI3nqLEnKXx8J+acquWhq+WvqycsJycsJyN3aW5lU3RhdHVzJyk7c2VsZWN0ZWRXaW5lPScnO3JlbmRlcldpbmVzKCk7Y2hvb3NlV2luZSgnJyl9OwokKCcjd2lraUZvcm0nKS5vbnN1Ym1pdD1hc3luYyBlPT57ZS5wcmV2ZW50RGVmYXVsdCgpO2NvbnN0IGY9bmV3IEZvcm1EYXRhKGUuY3VycmVudFRhcmdldCksb2xkPWNvbnRlbnQud2lraVtzZWxlY3RlZFdpa2ldLGl0ZW09e2NhdGVnb3J5OmYuZ2V0KCdjYXRlZ29yeScpLHRpdGxlOmYuZ2V0KCd0aXRsZScpLnRyaW0oKSxib2R5OmYuZ2V0KCdib2R5JykudHJpbSgpLG9yZGVyOk51bWJlcihmLmdldCgnb3JkZXInKSl8fDk5fTtpZihvbGQpT2JqZWN0LmFzc2lnbihvbGQsaXRlbSk7ZWxzZXtjb250ZW50Lndpa2kucHVzaChpdGVtKTtzZWxlY3RlZFdpa2k9Y29udGVudC53aWtpLmxlbmd0aC0xfWNvbnRlbnQud2lraS5zb3J0KChhLGIpPT5hLmNhdGVnb3J5LmxvY2FsZUNvbXBhcmUoYi5jYXRlZ29yeSwnemgtSGFudCcpfHxhLm9yZGVyLWIub3JkZXIpO3NlbGVjdGVkV2lraT1jb250ZW50Lndpa2kuaW5kZXhPZihvbGR8fGl0ZW0pO2F3YWl0IHNhdmUoYCR7b2xkPyfkv67mlLknOifmlrDlop4nfeeZvuenke+8miR7aXRlbS50aXRsZX1gLGYuZ2V0KCd3aWtpRWRpdG9yJyksZi5nZXQoJ3dpa2lOb3RlJyksJyN3aWtpU3RhdHVzJyk7cmVuZGVyV2lraSgpO2Nob29zZVdpa2koc2VsZWN0ZWRXaWtpKX07CiQoJyNkZWxldGVXaWtpJykub25jbGljaz1hc3luYygpPT57Y29uc3QgeD1jb250ZW50Lndpa2lbc2VsZWN0ZWRXaWtpXTtpZigheHx8IWNvbmZpcm0oYOeiuuWumuWIqumZpOOAjCR7eC50aXRsZX3jgI3vvJ9gKSlyZXR1cm47Y29udGVudC53aWtpLnNwbGljZShzZWxlY3RlZFdpa2ksMSk7YXdhaXQgc2F2ZShg5Yiq6Zmk55m+56eR77yaJHt4LnRpdGxlfWAscHJvbXB0KCfoq4vovLjlhaXmk43kvZzkurrlk6HlkI3nqLEnKXx8J+acquWhq+WvqycsJycsJyN3aWtpU3RhdHVzJyk7c2VsZWN0ZWRXaWtpPS0xO3JlbmRlcldpa2koKTtjaG9vc2VXaWtpKC0xKX07CmlmKCFhZG1pblBhc3N3b3JkKCkpc2hvd0FkbWluTG9naW4oKTtlbHNlIChhc3luYygpPT57Y29udGVudD1hd2FpdCBhcGkoJy9hcGkvY29udGVudCcpO3JlbmRlcldpbmVzKCk7cmVuZGVyV2lraSgpO2Nob29zZVdpbmUoJycpO2Nob29zZVdpa2koLTEpO2F3YWl0IGhpc3RvcnkoKX0pKCkuY2F0Y2goZT0+e3Nlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3dpbm53YXlfYWRtaW5fcGFzc3dvcmQnKTtkb2N1bWVudC5ib2R5LmlubmVySFRNTD1gPG1haW4gY2xhc3M9IndyYXAiPjxoMT7nhKHms5XplovllZ/lvozlj7A8L2gxPjxwPiR7ZXNjKGUubWVzc2FnZSl9PC9wPjxwPjxidXR0b24gb25jbGljaz0ibG9jYXRpb24ucmVsb2FkKCkiPumHjeaWsOmpl+itiTwvYnV0dG9uPjwvcD48L21haW4+YH0pOwovKiDorpPkv67mlLnkurrlk6HoiIflgpnoqLvlj6/mraPnorrlr6vlhaXkv67mlLnntIDpjITjgIIgKi8KJCgnI3dpbmVFZGl0b3InKS5uYW1lPSd3aW5lRWRpdG9yJzskKCcjd2luZU5vdGUnKS5uYW1lPSd3aW5lTm90ZSc7CiQoJyN3aWtpRWRpdG9yJykubmFtZT0nd2lraUVkaXRvcic7JCgnI3dpa2lOb3RlJykubmFtZT0nd2lraU5vdGUnOwovKiDphZLpoZ7mrITkvY3oiIflg7nmoLzmoLzlvI/vvJroiIrmnInphZLmrL7kuIDlvovpoJDoqK3ngrrokaHokITphZLjgIIgKi8KY29uc3QgbGlxdW9yTGFiZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTsKbGlxdW9yTGFiZWwuaW5uZXJIVE1MPSfphZLpoZ48c2VsZWN0IG5hbWU9ImxpcXVvclR5cGUiPjxvcHRpb24gdmFsdWU9IuiRoeiQhOmFkiI+6JGh6JCE6YWSPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT0i54OI6YWSIj7ng4jphZI8L29wdGlvbj48b3B0aW9uIHZhbHVlPSLlhbbku5YiPuWFtuS7ljwvb3B0aW9uPjwvc2VsZWN0Pic7CmNvbnN0IHNwaXJpdENhdGVnb3J5TGFiZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTsKc3Bpcml0Q2F0ZWdvcnlMYWJlbC5pbm5lckhUTUw9J+mFkumhnue0sOWIhumhnu+8iOmBuOWhq++8iTxpbnB1dCBuYW1lPSJzcGlyaXRDYXRlZ29yeSIgcGxhY2Vob2xkZXI9IuS+i+Wmgu+8muWogeWjq+W/jOOAgeeZveiYreWcsCI+JzsKY29uc3QgYWxjb2hvbENvbnRlbnRMYWJlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpOwphbGNvaG9sQ29udGVudExhYmVsLmlubmVySFRNTD0n6YWS57K+5r+D5bqm77yI6YG45aGr77yJPGlucHV0IG5hbWU9ImFsY29ob2xDb250ZW50IiBwbGFjZWhvbGRlcj0i5L6L5aaC77yaNDAlIj4nOwokKCcjd2luZUZvcm0nKS5lbGVtZW50cy5jb3VudHJ5LmNsb3Nlc3QoJ2xhYmVsJykuYWZ0ZXIobGlxdW9yTGFiZWwsc3Bpcml0Q2F0ZWdvcnlMYWJlbCxhbGNvaG9sQ29udGVudExhYmVsKTsKJCgnI3dpbmVGb3JtJykuZWxlbWVudHMucHJpY2UucGxhY2Vob2xkZXI9J+S+i+Wmgu+8miQzLDAwMOKAkzQsMDAwJzsKJCgnI3dpbmVGb3JtJykuZWxlbWVudHMudmludGFnZXMucGxhY2Vob2xkZXI9JzIwMjE6ICQzLDYwMFxuMjAyMDogJDMsMjAwJzsKY29uc3Qgb3JpZ2luYWxXaW5lRGF0YT13aW5lRGF0YTsKd2luZURhdGE9dz0+KHsuLi5vcmlnaW5hbFdpbmVEYXRhKHcpLGxpcXVvclR5cGU6dy5saXF1b3JUeXBlfHwn6JGh6JCE6YWSJyxzcGlyaXRDYXRlZ29yeTp3LnNwaXJpdENhdGVnb3J5fHwnJyxhbGNvaG9sQ29udGVudDp3LmFsY29ob2xDb250ZW50fHwnJ30pOwpjb25zdCBvcmlnaW5hbFNhdmVXaXRoTGlxdW9yRGV0YWlscz1zYXZlOwpzYXZlPWFzeW5jKC4uLmFyZ3MpPT57aWYoU3RyaW5nKGFyZ3NbMF18fCcnKS5pbmNsdWRlcygn6YWS5qy+77yaJykpe2NvbnN0IGZvcm09JCgnI3dpbmVGb3JtJyksd2luZT1jb250ZW50LndpbmVzLmZpbmQoaXRlbT0+aXRlbS5pZD09PXNlbGVjdGVkV2luZSk7aWYoZm9ybSYmd2luZSl7d2luZS5zcGlyaXRDYXRlZ29yeT1mb3JtLmVsZW1lbnRzLnNwaXJpdENhdGVnb3J5LnZhbHVlLnRyaW0oKTt3aW5lLmFsY29ob2xDb250ZW50PWZvcm0uZWxlbWVudHMuYWxjb2hvbENvbnRlbnQudmFsdWUudHJpbSgpfX1yZXR1cm4gb3JpZ2luYWxTYXZlV2l0aExpcXVvckRldGFpbHMoLi4uYXJncyl9OwokKCcjd2luZUZvcm0nKS5vbnN1Ym1pdD1hc3luYyBlPT57ZS5wcmV2ZW50RGVmYXVsdCgpO2NvbnN0IGY9bmV3IEZvcm1EYXRhKGUuY3VycmVudFRhcmdldCksb2xkPWNvbnRlbnQud2luZXMuZmluZCh3PT53LmlkPT09c2VsZWN0ZWRXaW5lKSxpZD1vbGQ/LmlkfHxzbHVnKGYuZ2V0KCdlbmdsaXNoTmFtZScpfHxmLmdldCgnbmFtZScpKTtjb25zdCB3PXtpZCxvcmRlcjpvbGQ/Lm9yZGVyfHxNYXRoLm1heCgwLC4uLmNvbnRlbnQud2luZXMubWFwKHg9Pk51bWJlcih4Lm9yZGVyKXx8MCkpKzEsbmFtZTpmLmdldCgnbmFtZScpLnRyaW0oKSxlbmdsaXNoTmFtZTpmLmdldCgnZW5nbGlzaE5hbWUnKS50cmltKCksd2luZXJ5OmYuZ2V0KCd3aW5lcnknKS50cmltKCksbGlxdW9yVHlwZTpmLmdldCgnbGlxdW9yVHlwZScpfHwn6JGh6JCE6YWSJyxjb3VudHJ5OmYuZ2V0KCdjb3VudHJ5JykudHJpbSgpLHJlZ2lvbjpmLmdldCgncmVnaW9uJykudHJpbSgpLGdyYXBlOmYuZ2V0KCdncmFwZScpLnRyaW0oKSxwcmljZTpmLmdldCgncHJpY2UnKS50cmltKCksaW1hZ2U6Zi5nZXQoJ2ltYWdlJykudHJpbSgpLGJvZHk6TnVtYmVyKGYuZ2V0KCdib2R5JykpfHxudWxsLHRhbm5pbjpOdW1iZXIoZi5nZXQoJ3Rhbm5pbicpKXx8bnVsbCxhY2lkaXR5Ok51bWJlcihmLmdldCgnYWNpZGl0eScpKXx8bnVsbCxhcm9tYTpmLmdldCgnYXJvbWEnKS50cmltKCkscGFpcmluZzpmLmdldCgncGFpcmluZycpLnRyaW0oKSxzdG9yeTpmLmdldCgnc3RvcnknKS50cmltKCksaGFzVmludGFnZTpmLmdldCgnaGFzVmludGFnZScpPT09J3RydWUnfTtpZihvbGQpT2JqZWN0LmFzc2lnbihvbGQsdyk7ZWxzZSBjb250ZW50LndpbmVzLnB1c2godyk7Y29uc3QgdnM9Zi5nZXQoJ3ZpbnRhZ2VzJykuc3BsaXQoL1xyP1xuLykubWFwKHg9Pnguc3BsaXQoJzonKSkuZmlsdGVyKHg9PngubGVuZ3RoPjEmJnhbMF0udHJpbSgpJiZ4LnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkpLm1hcCh4PT4oe3llYXI6eFswXS50cmltKCkscHJpY2U6eC5zbGljZSgxKS5qb2luKCc6JykudHJpbSgpfSkpO2lmKHZzLmxlbmd0aCljb250ZW50LnZpbnRhZ2VzQnlXaW5lW2lkXT12cztlbHNlIGRlbGV0ZSBjb250ZW50LnZpbnRhZ2VzQnlXaW5lW2lkXTtzZWxlY3RlZFdpbmU9aWQ7YXdhaXQgc2F2ZShgJHtvbGQ/J+S/ruaUuSc6J+aWsOWinid96YWS5qy+77yaJHt3Lm5hbWV9YCxmLmdldCgnd2luZUVkaXRvcicpLGYuZ2V0KCd3aW5lTm90ZScpLCcjd2luZVN0YXR1cycpO3JlbmRlcldpbmVzKCk7Y2hvb3NlV2luZShpZCl9Owo8L3NjcmlwdD48L2h0bWw+Cg==";
const adminHtml = () => new TextDecoder().decode(Uint8Array.from(atob(ADMIN_HTML_B64), (character) => character.charCodeAt(0)));

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" },
});

const html = (body, status = 200, headers = {}) => new Response(body, {
  status,
  headers: { "content-type": "text/html; charset=UTF-8", ...headers },
});

const base64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");

const fromBase64url = (value) => Uint8Array.from(
  atob(value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - value.length % 4) % 4)),
  (character) => character.charCodeAt(0),
);

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function hasSession(request, env) {
  const token = (request.headers.get("cookie") || "").match(/(?:^|; )winnway_session_v2=([^;]+)/)?.[1];
  if (!token || !env.SESSION_SECRET) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await hmac(payload, env.SESSION_SECRET)) return false;
  try { return JSON.parse(new TextDecoder().decode(fromBase64url(payload))).expiresAt > Date.now(); }
  catch { return false; }
}

async function newSession(env) {
  const payload = base64url(encoder.encode(JSON.stringify({ expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 })));
  return `${payload}.${await hmac(payload, env.SESSION_SECRET)}`;
}

async function hasAdminSession(request, env) {
  const token = (request.headers.get("cookie") || "").match(/(?:^|; )winnway_admin=([^;]+)/)?.[1];
  if (!token || !env.SESSION_SECRET) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await hmac(payload, env.SESSION_SECRET)) return false;
  try {
    const value = JSON.parse(new TextDecoder().decode(fromBase64url(payload)));
    return value.role === "admin" && value.expiresAt > Date.now();
  } catch { return false; }
}

async function newAdminSession(env) {
  const payload = base64url(encoder.encode(JSON.stringify({ role: "admin", expiresAt: Date.now() + 1000 * 60 * 60 * 12 })));
  return `${payload}.${await hmac(payload, env.SESSION_SECRET)}`;
}

function loginPage(message = "") {
  return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Winnway Studio</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f2e9dc;color:#251619;font:16px system-ui,"Microsoft JhengHei",sans-serif}.box{width:min(400px,88vw);background:#fffdfa;padding:38px;box-shadow:0 20px 60px #4b2b2730}.brand{font:700 25px Georgia,serif;letter-spacing:.1em}.brand small{display:block;color:#766963;font:11px Georgia,serif;letter-spacing:.18em;margin-top:6px}.field-label{display:block;margin:30px 0 8px}input,button{box-sizing:border-box;width:100%;padding:13px;font:inherit}input{border:1px solid #d8caba}.show{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:#685b54}.show input{width:auto;padding:0}button{margin-top:14px;border:0;background:#7c2d38;color:#fff}.error{color:#8b2f3a;font-size:13px}</style><main class="box"><div class="brand">WINNWAY STUDIO<small>THE ART OF DISCOVERY</small></div><label class="field-label">網站共用密碼</label><form method="post" action="/api/login"><input id="password" name="password" type="password" required autofocus><label class="show"><input id="showPassword" type="checkbox">顯示密碼</label><button>進入網站</button></form>${message}<script>document.querySelector("#showPassword").onchange=e=>document.querySelector("#password").type=e.target.checked?"text":"password";</script></main></html>`;
}

function adminLoginPage(message = "") {
  return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Winnway Studio｜管理驗證</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f2e9dc;color:#251619;font:16px system-ui,"Microsoft JhengHei",sans-serif}.box{width:min(400px,88vw);background:#fffdfa;padding:38px;box-shadow:0 20px 60px #4b2b2730}.brand{font:700 25px Georgia,serif;letter-spacing:.1em}.brand small{display:block;color:#766963;font:11px Georgia,serif;letter-spacing:.18em;margin-top:6px}.field-label{display:block;margin:30px 0 8px}input,button{box-sizing:border-box;width:100%;padding:13px;font:inherit}input{border:1px solid #d8caba}.show{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:#685b54}.show input{width:auto;padding:0}button{margin-top:14px;border:0;background:#7c2d38;color:#fff}.error{color:#8b2f3a;font-size:13px}</style><main class="box"><div class="brand">WINNWAY STUDIO<small>CONTENT ADMIN</small></div><label class="field-label">管理後台密碼</label><form id="adminForm"><input id="password" name="password" type="password" required autofocus><label class="show"><input id="showPassword" type="checkbox">顯示密碼</label><button>進入後台</button></form><p id="error" class="error">${message}</p><script>document.querySelector("#showPassword").onchange=e=>document.querySelector("#password").type=e.target.checked?"text":"password";document.querySelector("#adminForm").onsubmit=async e=>{e.preventDefault();const r=await fetch("/api/admin/login",{method:"POST",body:new FormData(e.currentTarget),credentials:"same-origin"});const d=await r.json();if(!r.ok){document.querySelector("#error").textContent=d.error||"驗證失敗。";return}location.href="/admin"};</script></main></html>`;
}

async function requestBody(request) { try { return await request.json(); } catch { return {}; } }

async function cellarData(env) {
  const items = (await env.CELLAR_DB.prepare("SELECT * FROM cellar_items ORDER BY updated_at DESC").all()).results;
  const entries = (await env.CELLAR_DB.prepare("SELECT * FROM cellar_entries ORDER BY id DESC").all()).results;
  return { items, entries };
}

async function cellarApi(request, env, pathname) {
  if (pathname === "/api/cellar" && request.method === "GET") return json(await cellarData(env));
  const body = await requestBody(request);
  if (pathname === "/api/cellar/add" && request.method === "POST") {
    if (!body.wineId) return json({ error: "缺少酒款資料。" }, 400);
    await env.CELLAR_DB.prepare("INSERT OR IGNORE INTO cellar_items(wine_id) VALUES(?1)").bind(body.wineId).run();
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/remove" && request.method === "POST") {
    await env.CELLAR_DB.batch([env.CELLAR_DB.prepare("DELETE FROM cellar_entries WHERE wine_id=?1").bind(body.wineId), env.CELLAR_DB.prepare("DELETE FROM cellar_items WHERE wine_id=?1").bind(body.wineId)]);
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/meta" && request.method === "POST") {
    await env.CELLAR_DB.prepare("UPDATE cellar_items SET location=?2,note=?3,updated_at=CURRENT_TIMESTAMP WHERE wine_id=?1").bind(body.wineId, String(body.location || ""), String(body.note || "")).run();
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/entry" && request.method === "POST") {
    const quantity = Math.max(1, Number(body.quantity) || 1), type = body.type === "out" ? "out" : "in";
    const row = await env.CELLAR_DB.prepare("SELECT COALESCE(SUM(CASE WHEN entry_type='out' THEN -quantity ELSE quantity END),0) stock FROM cellar_entries WHERE wine_id=?1").bind(body.wineId).first();
    if (type === "out" && quantity > Number(row?.stock || 0)) return json({ error: "取出數量超過現有庫存。" }, 400);
    await env.CELLAR_DB.prepare("INSERT INTO cellar_entries(wine_id,entry_date,entry_type,quantity,reason,person_name) VALUES(?1,?2,?3,?4,?5,?6)").bind(body.wineId, body.date || new Date().toISOString().slice(0, 10), type, quantity, String(body.reason || ""), String(body.personName || "未填寫")).run();
    return json(await cellarData(env));
  }
  return json({ error: "找不到酒窖功能。" }, 404);
}

async function ensureContentTables(env) {
  await env.CELLAR_DB.batch([
    env.CELLAR_DB.prepare("CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)"),
    env.CELLAR_DB.prepare("CREATE TABLE IF NOT EXISTS content_audit (id INTEGER PRIMARY KEY AUTOINCREMENT, editor_name TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', summary TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
  ]);
}

async function fallbackContent(request, env) {
  const assetUrl = new URL("/winnway-content.json", request.url);
  const response = await env.ASSETS.fetch(new Request(assetUrl, request));
  if (!response.ok) throw new Error("找不到初始內容檔 winnway-content.json");
  return await response.json();
}

async function managedContent(request, env) {
  await ensureContentTables(env);
  const stored = await env.CELLAR_DB.prepare("SELECT value FROM site_settings WHERE key='managed_content'").first();
  if (stored?.value) return JSON.parse(stored.value);
  return fallbackContent(request, env);
}

async function contentApi(request, env, pathname) {
  if (pathname === "/api/content" && request.method === "GET") return json(await managedContent(request, env));
  if (pathname === "/api/content/history" && request.method === "GET") {
    await ensureContentTables(env);
    const history = (await env.CELLAR_DB.prepare("SELECT id,editor_name,note,summary,created_at FROM content_audit ORDER BY id DESC LIMIT 30").all()).results;
    return json({ history });
  }
  if (pathname === "/api/content" && request.method === "PUT") {
    const body = await requestBody(request), content = body.content;
    if (!content || !Array.isArray(content.wines) || !Array.isArray(content.wiki) || typeof content.vintagesByWine !== "object") return json({ error: "內容格式不完整，請重新整理後再儲存。" }, 400);
    await ensureContentTables(env);
    const editor = String(body.editorName || "未填寫").slice(0, 80);
    const note = String(body.note || "").slice(0, 500);
    const summary = String(body.summary || `更新酒款 ${content.wines.length} 筆、百科 ${content.wiki.length} 筆`).slice(0, 300);
    await env.CELLAR_DB.batch([
      env.CELLAR_DB.prepare("INSERT INTO site_settings(key,value) VALUES('managed_content',?1) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(JSON.stringify(content)),
      env.CELLAR_DB.prepare("INSERT INTO content_audit(editor_name,note,summary) VALUES(?1,?2,?3)").bind(editor, note, summary),
    ]);
    return json({ ok: true, updatedAt: new Date().toISOString() });
  }
  return json({ error: "找不到內容管理功能。" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/login") return html(loginPage());
    if (url.pathname === "/api/login" && request.method === "POST") {
      const form = await request.formData();
      if (!env.SITE_PASSWORD || !env.SESSION_SECRET) return html(loginPage("<p class=error>網站尚未完成密碼設定。</p>"), 503);
      if (String(form.get("password") || "") !== env.SITE_PASSWORD) return html(loginPage("<p class=error>密碼不正確，請再試一次。</p>"), 401);
      const cookie = await newSession(env);
      return new Response(null, { status: 302, headers: [["location", "/"], ["set-cookie", `winnway_session_v2=${cookie}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`], ["set-cookie", "winnway_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"]] });
    }
    if (url.pathname === "/api/logout") return new Response(null, { status: 302, headers: [["location", "/login"], ["set-cookie", "winnway_session_v2=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"], ["set-cookie", "winnway_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"], ["set-cookie", "winnway_admin=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"]] });

    const signedIn = await hasSession(request, env);
    if (url.pathname === "/admin" || url.pathname === "/admin.html") {
      if (!signedIn) return Response.redirect(`${url.origin}/login`, 302);
      return html(adminHtml());
    }
    if (url.pathname === "/api/admin/verify" && request.method === "POST") {
      if (!signedIn) return json({ error: "請先登入網站。" }, 401);
      const form = await requestBody(request);
      if (!env.ADMIN_PASSWORD) return json({ error: "尚未設定管理後台密碼。" }, 503);
      if (String(form.password || "") !== env.ADMIN_PASSWORD) return json({ error: "管理密碼不正確。" }, 401);
      return json({ ok: true });
    }
    if (!signedIn) return Response.redirect(`${url.origin}/login`, 302);
    try {
      if (url.pathname === "/winnway-content.json") return json(await managedContent(request, env));
      if (url.pathname.startsWith("/api/cellar")) return cellarApi(request, env, url.pathname);
      if (url.pathname.startsWith("/api/content")) {
        if (!env.ADMIN_PASSWORD || request.headers.get("x-winnway-admin") !== env.ADMIN_PASSWORD) return json({ error: "請先通過後台密碼驗證。" }, 403);
        return contentApi(request, env, url.pathname);
      }
      return env.ASSETS.fetch(request);
    } catch (error) { return json({ error: `系統暫時無法處理：${error.message}` }, 500); }
  },
};
