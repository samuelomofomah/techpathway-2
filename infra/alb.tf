resource "aws_lb" "frontend_alb" {
  name               = "techpathway-alb"
  internal           = false
  load_balancer_type = "application"

  subnets = [
    aws_subnet.public_subnet.id,
    aws_subnet.public_subnet_2.id
  ]

  security_groups = [
    aws_security_group.ecs_sg.id
  ]
}


resource "aws_lb_target_group" "frontend_tg" {
  name     = "frontend-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.techpathway_vpc.id

  target_type = "ip"

  health_check {
    path = "/"
    port = "3000"
  }
}


resource "aws_lb_listener" "frontend_listener" {
  load_balancer_arn = aws_lb.frontend_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_tg.arn
  }
}