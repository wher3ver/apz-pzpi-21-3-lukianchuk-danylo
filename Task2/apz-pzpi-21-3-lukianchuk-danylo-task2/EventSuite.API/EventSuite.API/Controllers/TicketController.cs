﻿using Microsoft.AspNetCore.Mvc;

namespace EventSuite.API.Controllers
{
    public class TicketController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
