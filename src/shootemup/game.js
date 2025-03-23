;(function () {
  // Game canvas setup
  const canvas = document.getElementById("gameCanvas")
  const ctx = canvas.getContext("2d")
  canvas.width = 800
  canvas.height = 600

  // Game variables
  let score = 0
  let health = 100
  let gameOver = false
  let animationId

  // Player
  const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: "#4CAF50",
    speed: 5,
    dx: 0,
    dy: 0,
  }

  // Projectiles array
  const projectiles = []

  // Enemies array
  const enemies = []

  // Controls state
  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
    " ": false, // Space key
  }

  // Event listeners for keyboard controls
  window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true
    }
  })

  window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false
    }
  })

  // Restart button event listener
  document.getElementById("restartButton").addEventListener("click", restartGame)

  // Draw player
  function drawPlayer() {
    ctx.fillStyle = player.color
    ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height)

    // Draw player gun
    ctx.fillStyle = "#333"
    ctx.fillRect(player.x - 5, player.y - player.height / 2 - 15, 10, 15)
  }

  // Update player position based on controls
  function updatePlayerPosition() {
    // Reset movement
    player.dx = 0
    player.dy = 0

    // Check horizontal movement
    if ((keys.ArrowLeft || keys.a) && player.x > player.width / 2) {
      player.dx = -player.speed
    }
    if ((keys.ArrowRight || keys.d) && player.x < canvas.width - player.width / 2) {
      player.dx = player.speed
    }

    // Check vertical movement
    if ((keys.ArrowUp || keys.w) && player.y > player.height / 2) {
      player.dy = -player.speed
    }
    if ((keys.ArrowDown || keys.s) && player.y < canvas.height - player.height / 2) {
      player.dy = player.speed
    }

    // Update position
    player.x += player.dx
    player.y += player.dy

    // Keep player within bounds
    if (player.x < player.width / 2) player.x = player.width / 2
    if (player.x > canvas.width - player.width / 2) player.x = canvas.width - player.width / 2
    if (player.y < player.height / 2) player.y = player.height / 2
    if (player.y > canvas.height - player.height / 2) player.y = canvas.height - player.height / 2
  }

  // Projectile class
  class Projectile {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.width = 5
      this.height = 15
      this.speed = 10
      this.color = "#FFF"
    }

    update() {
      this.y -= this.speed
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
  }

  // Enemy class
  class Enemy {
    constructor() {
      this.width = 40
      this.height = 40
      this.x = Math.random() * (canvas.width - this.width) + this.width / 2
      this.y = -this.height
      this.speed = Math.random() * 2 + 1
      this.color = `hsl(${Math.random() * 360}, 50%, 50%)`
    }

    update() {
      this.y += this.speed
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
  }

  // Shoot projectile
  function shoot() {
    if (keys[" "]) {
      projectiles.push(new Projectile(player.x, player.y - player.height / 2))
      keys[" "] = false // Reset to prevent continuous firing
    }
  }

  // Spawn enemies
  function spawnEnemies() {
    if (Math.random() < 0.02) {
      enemies.push(new Enemy())
    }
  }

  // Check collisions
  function checkCollisions() {
    // Check projectile-enemy collisions
    for (let i = projectiles.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        const projectile = projectiles[i]
        const enemy = enemies[j]

        if (
          projectile.x < enemy.x + enemy.width / 2 &&
          projectile.x > enemy.x - enemy.width / 2 &&
          projectile.y < enemy.y + enemy.height / 2 &&
          projectile.y > enemy.y - enemy.height / 2
        ) {
          // Remove enemy and projectile
          enemies.splice(j, 1)
          projectiles.splice(i, 1)

          // Increase score
          score += 10
          document.getElementById("score").textContent = score

          break
        }
      }
    }

    // Check player-enemy collisions
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i]

      if (
        player.x < enemy.x + enemy.width / 2 &&
        player.x > enemy.x - enemy.width / 2 &&
        player.y < enemy.y + enemy.height / 2 &&
        player.y > enemy.y - enemy.height / 2
      ) {
        // Remove enemy
        enemies.splice(i, 1)

        // Decrease health
        health -= 10
        document.getElementById("health").textContent = health

        if (health <= 0) {
          endGame()
        }
      }
    }
  }

  // Update game state
  function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update player
    updatePlayerPosition()
    drawPlayer()

    // Handle shooting
    shoot()

    // Update and draw projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      projectiles[i].update()
      projectiles[i].draw()

      // Remove projectiles that are off screen
      if (projectiles[i].y < 0) {
        projectiles.splice(i, 1)
      }
    }

    // Spawn enemies
    spawnEnemies()

    // Update and draw enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update()
      enemies[i].draw()

      // Remove enemies that are off screen
      if (enemies[i].y > canvas.height) {
        enemies.splice(i, 1)

        // Decrease health
        health -= 5
        document.getElementById("health").textContent = health

        if (health <= 0) {
          endGame()
        }
      }
    }

    // Check collisions
    checkCollisions()

    // Continue animation loop if game is not over
    if (!gameOver) {
      animationId = requestAnimationFrame(update)
    }
  }

  // End game
  function endGame() {
    gameOver = true
    cancelAnimationFrame(animationId)
    document.getElementById("finalScore").textContent = score
    document.getElementById("gameOver").classList.remove("hidden")
  }

  // Restart game
  function restartGame() {
    // Reset game variables
    score = 0
    health = 100
    gameOver = false

    // Reset player position
    player.x = canvas.width / 2
    player.y = canvas.height - 100

    // Clear arrays
    projectiles.length = 0
    enemies.length = 0

    // Update UI
    document.getElementById("score").textContent = score
    document.getElementById("health").textContent = health
    document.getElementById("gameOver").classList.add("hidden")

    // Start game loop
    update()
  }

  // Start the game
  window.addEventListener("load", () => {
    update()
  })

  // Add touch controls for mobile
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const touchX = touch.clientX - rect.left

    // Move left or right based on touch position
    if (touchX < canvas.width / 2) {
      keys.ArrowLeft = true
      setTimeout(() => {
        keys.ArrowLeft = false
      }, 100)
    } else {
      keys.ArrowRight = true
      setTimeout(() => {
        keys.ArrowRight = false
      }, 100)
    }

    // Shoot
    keys[" "] = true
  })
})()
